function About() {
    return ( <>
        <div className="container  mt-3 border-top">
        <div className="row mt-5 p-5">
            <h1 className="text-center" >People</h1>
        </div>
        <div className="row">
           <div className="col p-5">
            <img src="" alt="photo"/>
            {/* add photo here */}
         </div>
           <div className="col p-5">
            <p>In addition, some other projects have also been created to test and improve my skills.</p>
            <p>Check them out at:<a href="https://github.com/Saikamal2007" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
        </div>
    </div>
    </> );
}

export default About;