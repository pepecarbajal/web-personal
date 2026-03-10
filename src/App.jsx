import { BrowserRouter, Routes, Route } from "react-router-dom";
import Propuesta1 from "./components/Propuesta1.jsx";
import Propuesta2 from "./components/Propuesta2.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Propuesta1 />} />
        <Route path="/2" element={<Propuesta2 />} />
      </Routes>
    </BrowserRouter>
  );
}
