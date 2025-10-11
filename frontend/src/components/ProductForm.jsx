import React, { useState } from "react";

export default function ProductForm({ setProducts }) {
  const [product, setProduct] = useState({ name: "", price: "", quantity: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.quantity) return;
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    setProduct({ name: "", price: "", quantity: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 mb-6 justify-between"
    >
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        className="border rounded p-2 w-full md:w-1/3"
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        className="border rounded p-2 w-full md:w-1/3"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={product.quantity}
        onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        className="border rounded p-2 w-full md:w-1/3"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}
