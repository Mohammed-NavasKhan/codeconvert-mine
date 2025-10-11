import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import Billing from "../components/Billing";

function BillingPage() {
  // Removed menu state to show both sections together
  const [products, setProducts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Rasi Billing Application</h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* Product selection section - Left Column */}
        <div className="bg-white p-6 rounded-xl shadow w-full md:w-[700px] h-[calc(100vh-400px)] overflow-hidden z-10">
          <h2 className="text-xl font-semibold mb-4">Product Selection</h2>
          <div className="h-full">
            <ProductForm setProducts={setProducts} />
          </div>
        </div>

        {/* Billing section - Right Column */}
        <div className="bg-white p-6 rounded-xl shadow w-full md:w-[600px] h-[calc(100vh-200px)] overflow-auto">
          <Billing products={products} />
        </div>
      </div>
    </div>
  );
}

export default BillingPage;
