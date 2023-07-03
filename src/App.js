import { Routes, Route } from "react-router-dom";

import Document from "./components/Document";
import EditDocs from "./components/EditDocs";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Document />} />
        <Route path="/edit/docs/:id" element={<EditDocs />} />
      </Routes>
    </div>
  );
}

export default App;
