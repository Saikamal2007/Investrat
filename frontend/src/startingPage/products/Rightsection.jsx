function Rightsection({image,title,description,tryDemo,learnMore}) {
    return ( <>
        <div className="container">
            <div className="row mt-5">
                <div className="col">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <a href="#" style={{marginRight:"10px"}} >{tryDemo}</a>
                    <a href="#">{learnMore}</a>
                </div>
                <div className="col">
                    <img src={image} alt="product" style={{width:"100%"}}/>
                </div>
            </div>
        </div> 
    </> );
}

export default Rightsection;
