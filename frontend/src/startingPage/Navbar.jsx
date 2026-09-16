import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#fafafa' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" style={{ width: '15%' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active px-4" to="/signup">
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active px-4" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active px-4" to="/products">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active px-4" to="/support">
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;