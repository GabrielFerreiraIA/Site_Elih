import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import TrustBar from "./components/sections/TrustBar";
import Metodo from "./components/sections/Metodo";
import CoberturaNacional from "./components/sections/CoberturaNacional";
import Solucoes from "./components/sections/Solucoes";
import ProvasMetricas from "./components/sections/ProvasMetricas";
import FinalCTA from "./components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero heroImageUrl="https://res.cloudinary.com/dxpfoolyp/image/upload/q_auto/f_auto/v1780423160/Hero_Elih__smb4uh.png" />
        <TrustBar />
        <Metodo />
        <CoberturaNacional />
        <Solucoes />
        <ProvasMetricas />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
