import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import FavoritesPage from "./components/favorties/favorites";
import RecipeDetails from "./components/Recipes/RecipeDetails";

function App() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage once when the app starts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/recipe/:id" element={<RecipeDetails favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
