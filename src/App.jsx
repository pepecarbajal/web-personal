import { BrowserRouter, Routes, Route } from "react-router-dom";
import Propuesta1 from "./components/propuesta1.jsx";
import Propuesta2 from "./components/Propuesta2.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/propuesta1" element={<Propuesta1 />} />
        <Route path="/propuesta2" element={<Propuesta2 />} />
      </Routes>
    </BrowserRouter>
  );
}