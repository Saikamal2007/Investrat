import Hero from "./Hero";
import Leftsection from "./Leftsection";
import spoolImage from "../../assets/spool.png";
import Rightsection from "./Rightsection";
function Productpage() {
    return (
        <>
            <Hero/>
            <Leftsection 
                image={spoolImage}
                title="Spool"
                description="ur ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Spool experience ."
                tryDemo="try demo"
                learnMore="learn more"
            />
            <Rightsection
                image={""}
                title="Console"
                description="The central dashboard for your Investrat account. Gain insights into your trades and investments with in-depth reports and visualisations."
                tryDemo="try demo"
                learnMore="learn more"
            />
        </>
    );
}

export default Productpage;