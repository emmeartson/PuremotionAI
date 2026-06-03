// removed accidental import of Result from postcss
import { useEffect } from "react";
import Container from "../../Layout/Container/Container";
import Header from "../../Shared/Header";
import Hero from "./Hero";
import LovedThousands from "./LovedThousands";
import Steps from "./Steps";
import WhyChoose from "./WhyChoose";
import Faq from "../../Shared/Faq";
import HaveQuestions from "./HaveQuestions";
import Footer from "../../Shared/Footer";
import Result from "./Result";
import { trackViewContent } from "../../utils/metaPixel";

const Home = () => {
  // Meta Pixel: ViewContent on landing page
  useEffect(() => {
    trackViewContent();
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Steps />
      <LovedThousands />
      <WhyChoose />
      <Result />
      <Faq />
      <HaveQuestions />
      <Footer />
    </div>
  );
};

export default Home;

