import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Ai from "../assets/agent.png";
const FeatureItem = ({ text }) => (
  <div className="flex items-start gap-2 py-2">
    <CheckCircleIcon className="h-6 w-6 flex-shrink-0 text-primary" />
    <p className="flex-1">{text}</p>
  </div>
);

const MortgageMateCard = ({ setIsOpen }) => {
  return (
    <div className="md:w-1/3 flex-2 h-full mt-4 mx-auto">
      <div className="bg-primary rounded-lg shadow-lg max-w-md flex-2 h-full">
        <div className="flex items-center gap-6 p-4 pb-0">
          <div className="w-24 h-24 flex">
            <img src={Ai} alt="AI Icon" width={100} height={100} />
          </div>
          <div>
            <h2 className="text-xl text-white font-semibold mb-1">
              Mortgage Mate
            </h2>
            <p className="text-sm text-white">Agentic AI Bot</p>
          </div>
        </div>

        <div className="space-y-3 bg-white py-6 rounded-lg p-6 pb-6 text-primary">
          {[
            "Personalised, Integrated experience",
            "Faster home buying process",
            "Easier, convenient, and automated",
          ].map((text, index) => (
            <FeatureItem key={index} text={text} />
          ))}
          <button
            className="w-full p-2 border border-primary rounded-lg hover:bg-gray-300 transition whitespace-nowrap text-primary font-semibold"
            onClick={() => setIsOpen(true)}
          >
            Start a conversation
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-2">Powered by AI</p>
      </div>
    </div>
  );
};

export default MortgageMateCard;
