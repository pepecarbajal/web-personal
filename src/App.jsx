import { BrowserRouter, Routes, Route } from "react-router-dom";
import Propuesta1 from "./components/propuesta1";
import Propuesta2 from "./components/propuesta2";

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