import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ItemsSection from "./ItemSection";
import InstamartCards from "./InstamartCards";
import SwiggyImage from "./SwiggyImage";
import Footer from "./Footer";
import "./Home.css";

function Home(){
    return(
        <>
        <Navbar />
        <HeroSection />
        <ItemsSection />
        <InstamartCards />
        <SwiggyImage />
        <Footer />
        </>
    );
}

export default Home;