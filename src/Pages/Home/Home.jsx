// removed accidental import of Result from postcss
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

const Home = () => {
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
