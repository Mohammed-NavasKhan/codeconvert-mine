import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Billing from "../components/Billing";

function BillingPage() {
  const [menu, setMenu] = useState("product");
  const [products, setProducts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Rasi Mens Wear Billing Application</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMenu("product")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            menu === "product" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Product
        </button>
        <button
          onClick={() => setMenu("billing")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            menu === "billing" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Billing
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        {menu === "product" && (
          <>
            <ProductForm setProducts={setProducts} />
            <ProductList products={products} setProducts={setProducts} />
          </>
        )}
        {menu === "billing" && <Billing products={products} />}
      </div>
    </div>
  );
}

export default BillingPage;
