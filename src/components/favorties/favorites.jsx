import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/fav.avif';
import Footer from '../Footer/Footer';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(recipe => recipe.id !== id);
    setFavorites(updatedFavorites);  // Update the state
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  // Update localStorage
  };


  return (
    <>
    <div className="flex flex-col min-h-screen">
      <div
        className="p-4 sm:p-6 flex-grow bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center font-[Vivaldi] text-white">
          Your Favorite Recipes
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center text-lg">No favorites yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map(recipe => (
              <div
                key={recipe.id}
                className="bg-black bg-opacity-90 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden transition"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-52 object-cover"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                />
                <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <button
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => removeFavorite(recipe.id)}
                    className="text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FavoritesPage;