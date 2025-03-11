import calculator from "../assets/calculator.svg";
import notification from "../assets/notifications.svg";
import application from "../assets/mortgage-application.svg";
export default function MortgageTools() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-center">
        Get started with our tools
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Looking for{" "}
        <a href="#" className="text-black underline">
          mortgage rates?
        </a>{" "}
        Use our mortgage calculator to compare rates and find deals that may be
        available for you.
      </p>

      <div className="mt-8 flex flex-col md:flex-row gap-6">
        {/* Mortgage Calculators */}
        <div className="bg-[#11b67a] text-black p-6 rounded-2xl shadow-lg flex-1 flex flex-col min-h-[400px]">
          <div className="h-24">
            <img src={calculator} className="w-18 h-18 md:w-24 md:h-24" />
          </div>
          <div className="flex items-center gap-3 h-16 mb-3">
            <h3 className="text-3xl font-semibold">
              Mortgage calculators and tools
            </h3>
          </div>
          <p className="mt-2 text-black flex-grow">
            Find out how much you could borrow, view our mortgage rates, compare
            monthly repayment amounts, and more.
          </p>
          <button className="mt-auto bg-black text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-gray-300 hover:underline hover:text-black">
            Use our mortgage calculators
          </button>
        </div>

        {/* Agreement in Principle */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 flex flex-col min-h-[400px]">
          <div className="h-24">
            <img src={application} className="w-18 h-18 md:w-24 md:h-24" />
          </div>
          <div className="flex items-center gap-3 h-16 mb-3">
            <h3 className="text-3xl font-semibold">Agreement in Principle</h3>
          </div>
          <p className="mt-2 text-gray-600 flex-grow">
            An Agreement in Principle confirms how much you could be eligible to
            borrow before you apply for a mortgage.
          </p>
          <button className="mt-auto border border-black text-black px-4 py-2 rounded-lg w-full hover:bg-gray-300 hover:underline">
            Get an Agreement in Principle
          </button>
        </div>

        {/* Mortgage Dashboard */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 flex flex-col min-h-[400px]">
          <div className="h-24">
            <img src={notification} className="w-18 h-18 md:w-24 md:h-24" />
          </div>
          <div className="flex items-center gap-3 h-16 mb-3">
            <h3 className="text-3xl font-semibold">Your mortgage dashboard</h3>
          </div>
          <div className="flex-grow">
            <p className="mt-2 text-gray-600">
              Track the progress of your home purchase from start to finish with
              your very own personalised mortgage dashboard.
            </p>
            <p className="mt-4 text-gray-600">
              Already registered?{" "}
              <a href="#" className="text-black underline">
                Sign back in
              </a>
            </p>
          </div>
          <button className="mt-auto border border-black text-black px-4 py-2 rounded-lg w-full hover:bg-gray-300 hover:underline">
            Create your mortgage dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
