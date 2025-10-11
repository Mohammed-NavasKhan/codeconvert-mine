import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import BillPDF from "./BillPDF";

const Billing = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSelect = (product) => {
    const exists = selectedProducts.find((p) => p.name === product.name);
    if (!exists) {
      const updated = [...selectedProducts, { ...product }];
      setSelectedProducts(updated);
      updateTotal(updated);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...selectedProducts];
    updated[index][field] = Number(value);
    setSelectedProducts(updated);
    updateTotal(updated);
  };

  const updateTotal = (items) => {
    const totalValue = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setTotal(totalValue);
  };

  const handlePrint = async () => {
    const lineHeight = 20;
    const topBottomMargin = 40;
    const minHeight = 283.46; // 100mm minimum

    const dynamicHeight = Math.max(
      minHeight,
      topBottomMargin + selectedProducts.length * lineHeight
    );

    const blob = await pdf(
      <BillPDF
        selectedProducts={selectedProducts}
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

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Select Product</h3>
        {products.map((p, i) => (
          <button
            key={i}
            className="border p-2 m-1 rounded bg-blue-500 text-white"
            onClick={() => handleSelect(p)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.name}</td>
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
              <td className="border p-2">
                <input
                  type="number"
                  className="w-20 border rounded p-1"
                  value={item.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
              </td>
              <td className="border p-2 text-right">
                {(item.quantity * item.price).toFixed(2)}
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
