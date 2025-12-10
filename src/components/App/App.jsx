import { useState } from "react";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";

import { defaultClothingItems } from "../../utils/defaultClothingItems.js";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  return (
    <div className="app">
      <Header />
      <Main clothingItems={clothingItems} />
      <Footer />
    </div>
  );
}

export default App;
