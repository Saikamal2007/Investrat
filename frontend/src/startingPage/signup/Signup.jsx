import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || "http://localhost:3000";

function Signup() {
    const [mode, setMode] = useState("register");
    const [form, setForm] = useState({ email: "", username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateField = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
        const body = mode === "register"
            ? form
            : { identifier: form.username || form.email, password: form.password };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Authentication failed");
            window.location.href = `${DASHBOARD_URL}/`;
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container py-5" style={{ maxWidth: "520px" }}>
            <h1>{mode === "register" ? "Create your account" : "Welcome back"}</h1>
            <p>{mode === "register" ? "Start managing your investments." : "Log in to open your dashboard."}</p>
            <div className="btn-group mb-4" role="group" aria-label="Authentication mode">
                <button type="button" className={`btn ${mode === "register" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setMode("register")}>Sign up</button>
                <button type="button" className={`btn ${mode === "login" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setMode("login")}>Log in</button>
            </div>
            <form onSubmit={submit}>
                {mode === "register" ? (
                    <>
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-control mb-3" id="email" name="email" type="email" required value={form.email} onChange={updateField} />
                        <label className="form-label" htmlFor="username">Username</label>
                        <input className="form-control mb-3" id="username" name="username" required minLength="3" value={form.username} onChange={updateField} />
                    </>
                ) : (
                    <>
                        <label className="form-label" htmlFor="identifier">Email or username</label>
                        <input className="form-control mb-3" id="identifier" name="username" required value={form.username} onChange={updateField} />
                    </>
                )}
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-control mb-3" id="password" name="password" type="password" required minLength="8" value={form.password} onChange={updateField} />
                {error && <p className="text-danger" role="alert">{error}</p>}
                <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Please wait..." : mode === "register" ? "Create account" : "Log in"}</button>
            </form>
        </main>
    );
}

export default Signup;