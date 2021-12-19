import "./App.css";
import Sidebar from "./Components/NavSideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SupplierData from "./Pages/SupplierData";
import ContractData from "./Pages/ContractData";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/SupplierData" element={<SupplierData/>} />
        <Route path="/ContractData" element={<ContractData/>} />
      </Routes>
    </Router>
  );
}

export default App;