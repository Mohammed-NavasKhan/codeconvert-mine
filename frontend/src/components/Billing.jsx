import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import BillPDF from "./BillPDF";

const Billing = ({ products }) => {
  const [localProducts, setLocalProducts] = useState(
    products.map((p) => ({ ...p }))
  );
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    setLocalProducts(products.map((p) => ({ ...p })));
  }, [products]);

  React.useEffect(() => {
    const totalValue = localProducts.reduce(
      (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
      0
    );
    setTotal(totalValue);
  }, [localProducts]);

  const handleChange = (index, field, value) => {
    const updated = [...localProducts];
    updated[index][field] = Number(value);
    setLocalProducts(updated);
  };

  const handleDelete = (index) => {
    const updatedProducts = localProducts.filter((_, i) => i !== index);
    setLocalProducts(updatedProducts);
  };

  const handlePrint = async () => {
    const lineHeight = 20;
    const topBottomMargin = 40;
    const minHeight = 983.46; // 100mm minimum

    const dynamicHeight = Math.max(
      minHeight,
      topBottomMargin + localProducts.length * lineHeight
    );

    const blob = await pdf(
      <BillPDF
        selectedProducts={localProducts}
        total={total}
        height={dynamicHeight}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const win = window.open(url);
    setTimeout(() => win.print(), 500); // auto open print dialog
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Billing</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {localProducts.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-20 border rounded p-1"
                  value={item.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-16 border rounded p-1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td className="border p-2 text-right">
                {((item.quantity || 0) * (item.price || 0)).toFixed(2)}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800 hover:underline px-2 py-1 rounded"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-4 font-bold">
        Total: ₹{total.toFixed(2)}
      </div>

      <div className="mt-4">
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          🖨️ Print Bill
        </button>
      </div>
    </div>
  );
};

export default Billing;
