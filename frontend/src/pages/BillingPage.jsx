import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Billing from "../components/Billing";

function BillingPage() {
  // Removed menu state to show both sections together
  const [products, setProducts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Rasi Billing Application</h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-8">
        {/* Product selection section */}
        <ProductForm setProducts={setProducts} />
        <ProductList products={products} setProducts={setProducts} />
        {/* Billing section */}
        <Billing products={products} />
      </div>
    </div>
  );
}

export default BillingPage;
