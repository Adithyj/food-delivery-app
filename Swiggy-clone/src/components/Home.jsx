import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ItemsSection from "./ItemSection";
import InstamartCards from "./InstamartCards";
import SwiggyImage from "./SwiggyImage";
import Footer from "./Footer";
import DineoutSection from "./DineoutSection";
import "./Home.css";

function Home(){
    return(
        <>
        <Navbar />
        <HeroSection />
        <ItemsSection />
        <InstamartCards />
        <DineoutSection />
        <SwiggyImage />
        
        <Footer />
        </>
    );
}

export default Home;