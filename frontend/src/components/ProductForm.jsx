import React, { useState, useRef, useEffect } from "react";

// Predefined product list
const predefinedProducts = [
  { name: "Sarees" },
  { name: "Tops" },
  { name: "Chudithar" },
  { name: "Gown" },
  { name: "Nighty" },
  { name: "In Skirt" },
  { name: "Blouse" },
  { name: "Western" },
  { name: "Legging" },
  { name: "Shawl" },
  { name: "Brassier" },
  { name: "Lungie" },
  { name: "Vestie" },
  { name: "T-Shirt" },
  { name: "Jeans" },
  { name: "Cotton Pants" },
  { name: "Shirts" },
  { name: "Trousers" },
  { name: "Vests" },
  { name: "Briefs" },
  { name: "Track" },
];

export default function ProductForm({ setProducts }) {
  const [product, setProduct] = useState({ name: "", price: "", quantity: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter products based on search term
    const filtered = predefinedProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductSelect = (selectedProduct) => {
    setProduct({ ...product, name: selectedProduct.name });
    setSearchTerm(selectedProduct.name);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.quantity) return;
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    setProduct({ name: "", price: "", quantity: "" });
    setSearchTerm("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 mb-6 justify-between"
    >
      <div className="relative w-full md:w-1/3" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search Product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedIndex(prev => 
                prev < filteredProducts.length - 1 ? prev + 1 : prev
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
            } else if (e.key === "Enter" && selectedIndex >= 0) {
              e.preventDefault();
              handleProductSelect(filteredProducts[selectedIndex]);
            } else if (e.key === "Escape") {
              setIsDropdownOpen(false);
              setSelectedIndex(-1);
            }
          }}
          className="border rounded p-2 w-full"
        />
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredProducts.map((p, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedIndex 
                    ? "bg-blue-100 hover:bg-blue-200" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleProductSelect(p)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="font-medium">{p.name}</div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="px-4 py-2 text-gray-500">No products found</div>
            )}
          </div>
        )}
      </div>
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
