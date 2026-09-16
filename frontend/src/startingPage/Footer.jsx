import logo from '../assets/logo.png';
function Footer() {
    return ( <>
        <div className="container-fluid border-top mt-5 px-5 pt-5 pb-5" style={{marginTop:"150px", backgroundColor:"#f5f5f5"}}>
            <div className="row">
                <div className="col">
                    <img src={logo} alt="Logo" style={{width:"40%"}}/>
                    <p className="fs-9 text-muted" style={{fontSize:"70%"}}>Not rights reserved, educational purposes only</p>
                </div>
                <div className="col">
                    <p>Company</p>
                    <a href="" className="text-muted text-decoration-none">About Us</a><br/>
                    <a href="" className="text-muted text-decoration-none">Products</a><br/>
                    <a href="" className="text-muted text-decoration-none">Referral programme</a><br/>
                    <a href="" className="text-muted text-decoration-none">Careers</a><br/>
                    <a href="" className="text-muted text-decoration-none">Press & Media</a>
                </div>
                <div className="col">
                    <p>Support</p>
                    <a href="" className="text-muted text-decoration-none">Contact Us</a><br/>
                    <a href="" className="text-muted text-decoration-none">Support Centre</a><br/>
                    <a href="" className="text-muted text-decoration-none">Downloads & Resources</a><br/>
                </div>
                <div className="col">
                    <p>Account</p>
                    <a href="" className="text-muted text-decoration-none">My Account</a><br/>
                    <a href="" className="text-muted text-decoration-none">Login</a><br/>
                    <a href="" className="text-muted text-decoration-none">Sign Up</a><br/>
                </div>
            </div>
            <div className="row mt-5 text-small text-muted">
                <p>Investrat is a comprehensive stock analysis platform designed for educational purposes. Our mission is to provide users with accessible tools and resources to learn about financial markets and investment strategies.</p>
                <p>All information provided on this platform is for educational and informational purposes only and should not be considered as financial advice. Users should conduct their own research and consult with qualified financial advisors before making any investment decisions.</p>
                <p>This educational project is maintained as a learning resource for understanding stock market analysis and investment principles.</p>
            </div>
        </div>
    </> );
}

export default Footer;