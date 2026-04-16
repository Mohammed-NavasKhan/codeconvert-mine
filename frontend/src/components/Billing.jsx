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
      (sum, i) => sum + (i.sellingPrice || 0) * (i.quantity || 0),
      0
    );
    const totalDiscount = localProducts.reduce(
      (sum, i) => sum + ((i.mrp - i.sellingPrice) || 0) * (i.quantity || 0),
      0
    );
    setTotal({ amount: totalValue, discount: totalDiscount });
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
    <div className="relative flex flex-col h-full">
      {/* Scrollable content area */}
      <div className="overflow-auto flex-1 pr-4 pl-4 pt-4 pb-32">
        <div className="mb-2 text-gray-600 flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Billing</h2>
          <p>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">MRP</th>
              <th className="border p-2">Selling Price</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Discount</th>
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
                    value={item.mrp}
                    onChange={(e) =>
                      handleChange(index, "mrp", e.target.value)
                    }
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-20 border rounded p-1"
                    value={item.sellingPrice}
                    onChange={(e) =>
                      handleChange(index, "sellingPrice", e.target.value)
                    }
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
                <td className="border p-2 text-right text-green-600">
                  {((item.mrp - item.sellingPrice || 0) * (item.quantity || 0)).toFixed(2)}
                </td>
                <td className="border p-2 text-right">
                  {((item.quantity || 0) * (item.sellingPrice || 0)).toFixed(2)}
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
      </div>

      {/* Fixed bottom section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="text-right space-y-1 mb-3">
          <p className="text-green-600 font-semibold">
            Total Discount: ₹{total.discount?.toFixed(2)}
          </p>
          <p className="text-xl font-bold">
            Total Amount: ₹{total.amount?.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePrint}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-colors duration-200"
          >
            🖨️ Print Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
