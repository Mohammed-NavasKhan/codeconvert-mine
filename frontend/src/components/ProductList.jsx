import React from "react";

export default function ProductList({ products, setProducts }) {
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Price (₹)</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.price}</td>
                <td className="border p-2">{p.quantity}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
