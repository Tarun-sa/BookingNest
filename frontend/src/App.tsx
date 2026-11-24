import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/search" element={<h1>Search</h1>} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
