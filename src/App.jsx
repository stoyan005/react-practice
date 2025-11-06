import { useState } from "react";

import "./App.css";
import Books from "./components/Books";
import SearchBox from "./components/SearchBox";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <h1>Book Finder</h1>
      <SearchBox searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
      <Books searchTerm = {searchTerm} />
    </>
  );
}

export default App;
