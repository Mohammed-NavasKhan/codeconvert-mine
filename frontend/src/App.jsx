import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumb from "./components/Breadcrumb";
import Homepage from "./pages/Home";
import CodeConverter from "./pages/CodeConverter";
import Mortgages from "./pages/Mortgages";
import Chat from "./pages/Chat";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar />
        <Breadcrumb /> */}
        <Sidebar />
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/modernisation" element={<CodeConverter />} />
          <Route path="/mortgages" element={<Mortgages />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
