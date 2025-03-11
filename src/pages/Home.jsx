import { useState } from "react";
import ChatbotPlugin from "../components/ChatbotPlugin";
import MortgageMateCard from "../components/MortgageMateCard";
import MortgageTools from "../components/MortgageTools";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="justify-center min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Section */}
          <div className="relative w-full max-w-7xl mx-auto p-4">
            {/* Background Image */}
            <div className="relative w-full h-[325px] md:h-[400px] rounded-xl overflow-hidden hidden md:block">
              <img
                src="https://www.lloydsbank.com/assets/mortgages/hassle-free-landing-page/11239_lb_mortgage_hubpage_banner_2072x650_awk_d_1x.jpg"
                alt="Mortgage Banner"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content Box */}
            <div className="relative md:absolute top-1/2 left-0 md:left-16 transform md:-translate-y-1/2 bg-primary text-white p-6 rounded-lg max-w-md shadow-lg">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-2">Mortgages</h1>
              <p className="mt-2 mb-4 md:mb-6 text-lg md:text-xl">
                Do you have a Club Lloyds current account? You could get an
                exclusive 0.20% discount on your initial rate when you complete
                on a qualifying mortgage with us.
              </p>
              <button className="mt-4 border font-bold border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition">
                Our Club Lloyds offers
              </button>
            </div>
          </div>

          {/* Right Section */}
          <MortgageMateCard setIsOpen={setIsOpen} />
        </div>
        <MortgageTools />
        <ChatbotPlugin {...{ isOpen, setIsOpen }} />
      </div>
    </div>
  );
};

export default Home;
