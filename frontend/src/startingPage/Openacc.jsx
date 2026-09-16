import { Link } from "react-router-dom";

function Openacc() {
    return ( <>
         <div className="container text-center mb-5"> 
                <h1>Open your account today</h1>
                <p className="text mb-3">Modern platform and apps, no clutter and no hidden fees.</p>
                <Link className="btn btn-primary p-3 px-5" to="/signup">Sign Up Now</Link>
        </div>
        
    </> );
}

export default Openacc;