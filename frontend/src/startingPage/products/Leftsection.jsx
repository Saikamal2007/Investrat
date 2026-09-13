function Leftsection({image,title,description,tryDemo,learnMore}) {
    return ( <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src={image} alt="product" style={{width:"100%"}}/>
                </div>
                <div className="col">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <a href="#">{tryDemo}</a>
                    <a href="#">{learnMore}</a>
                </div>
            </div>
        </div> 
    </> );
}

export default Leftsection;