import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyles } from "./GlobalStyles";
import Home from "./components/Home";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}