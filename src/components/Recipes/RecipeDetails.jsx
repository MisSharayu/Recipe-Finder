import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import recipes from "../data/recipes";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Footer from "../Footer/Footer";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));

  const [isFavorite, setIsFavorite] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // On mount, check if current recipe is in favorites
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = savedFavorites.some(fav => fav.id === recipe.id);
    setIsFavorite(isAlreadyFavorite);
  }, [recipe.id]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = savedFavorites.filter(fav => fav.id !== recipe.id);
      setPopupMessage("Removed from Favorites!");
      setIsFavorite(false);
    } else {
      updatedFavorites = [...savedFavorites, recipe];
      setPopupMessage("Added to Favorites!");
      setIsFavorite(true);
    }

    // Sync localStorage with updated favorites
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setTimeout(() => setPopupMessage(""), 2000);
  };

  const ingredientsFirstColumn = recipe.fullIngredients.slice(0, 5);
  const ingredientsSecondColumn = recipe.fullIngredients.slice(5);

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <div className="p-6 max-w-7xl mx-auto relative flex-grow">
        {popupMessage && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-[#231f2e] text-white px-6 py-4 rounded text-lg transition-all duration-300">
              {popupMessage}
            </div>
          </div>
        )}

        <img src={recipe.image} alt={recipe.title} className="w-full h-80 object-cover rounded" />

        <div className="relative flex justify-center items-center mt-4">
          <h1 className="text-3xl font-bold text-center">{recipe.title}</h1>
          <div
            className="absolute right-0 flex items-center gap-2 cursor-pointer text-6xl"
            onClick={toggleFavorite}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faHeartSolid : faHeartRegular}
              className={isFavorite ? "text-red-500" : "text-black"}
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          <div className="flex gap-8 relative right-[-10%]">
            <div className="flex flex-col w-1/2">
              {ingredientsFirstColumn.map((item, i) => (
                <motion.li key={i} className="mb-1 text-black list-disk ml-6">{item}</motion.li>
              ))}
            </div>
            <div className="flex flex-col w-1/2">
              {ingredientsSecondColumn.map((item, i) => (
                <motion.li key={i} className="mb-1 text-black list-disk ml-6">{item}</motion.li>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          <div className="flex gap-8 relative right-[-10%]">
            {/* First Column */}
            <ol className="flex flex-col w-1/2 list-decimal ml-6">
              {recipe.instructions.slice(0, Math.ceil(recipe.instructions.length / 2)).map((step, i) => (
                <motion.li key={i} className="mb-1">{step}</motion.li>
              ))}
            </ol>

            {/* Second Column */}
            <ol
              start={Math.ceil(recipe.instructions.length / 2) + 1}
              className="flex flex-col w-1/2 list-decimal ml-6"
            >
              {recipe.instructions.slice(Math.ceil(recipe.instructions.length / 2)).map((step, i) => (
                <motion.li key={i} className="mb-1">{step}</motion.li>
              ))}
            </ol>
          </div>

        </div>

        {/* Videos */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Video Tutorial</h2>
          <motion.div
            className="group flex overflow-hidden relative rounded cursor-pointer"
            initial={{ height: 320 }}
            whileHover={{ height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="w-full">
              <iframe
                width="100%"
                height="320"
                src={recipe.video1}
                title="Video 1"
                allowFullScreen
                className="rounded"
              ></iframe>
            </motion.div>
            <motion.div
              className="flex gap-4 absolute top-0 left-0 w-full h-full bg-white/90 opacity-0 group-hover:opacity-100 p-4 transition-opacity duration-500"
            >
              <iframe width="33%" height="240" src={recipe.video1} title="Video 1" allowFullScreen className="rounded shadow-lg"></iframe>
              <iframe width="33%" height="240" src={recipe.video2} title="Video 2" allowFullScreen className="rounded shadow-lg"></iframe>
              <iframe width="33%" height="240" src={recipe.video3} title="Video 3" allowFullScreen className="rounded shadow-lg"></iframe>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default RecipeDetails;