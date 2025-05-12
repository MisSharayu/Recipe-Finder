import React, { useState, useEffect } from 'react';
import recipes from '../data/recipes';
import { useNavigate } from 'react-router-dom';
import hero1 from '../../assets/hero.avif';
import hero2 from '../../assets/hero2.avif';
import hero3 from '../../assets/hero3.avif';
import hero4 from '../../assets/hero4.avif';
import logo from '../../assets/spoon.png';
import Footer from '../Footer/Footer';
import '../Home/Home.css'

const Home = () => {
  const [input, setInput] = useState(() => {
    return sessionStorage.getItem("searchInput") || "";
  });

  const sliderImages = [hero1, hero2, hero3, hero4];
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderTexts = [
    "Discover the Taste of Home",
    "Wholesome Meals with Simple Ingredients",
    "Cook Smart, Eat Fresh",
    "Spice Up Your Day with Easy Recipes"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000); // change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const [loading, setLoading] = useState(false);
  const enteredIngredients = input.toLowerCase().split(",").map(i => i.trim()).filter(i => i);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const [suggested, setSuggested] = useState(() => {
    const saved = sessionStorage.getItem('suggestedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = () => {
    const entered = input.toLowerCase().split(",").map(i => i.trim()).filter(i => i);

    if (entered.length < 3) {
      setPopupMessage("Please enter at least 3 ingredients.");
      setShowPopup(true);
      return;
    }

    setLoading(true); // Show loader

    setTimeout(() => {
      const result = recipes.filter(recipe => {
        const matched = entered.filter(i =>
          recipe.ingredients.map(r => r.toLowerCase()).includes(i)
        );
        return matched.length >= 3;
      });

      if (result.length === 0) {
        setPopupMessage("Work in Progress: No matching recipes found!");
        setShowPopup(true);
      }

      setSuggested(result);
      sessionStorage.setItem('suggestedRecipes', JSON.stringify(result));
      sessionStorage.setItem("searchInput", input);
      setLoading(false); // Hide loader after delay
    }, 1500); // simulate 1.5s delay
  };

  const openRecipe = (id) => navigate(`/recipe/${id}`);

  return (
    <>
      <div className="min-h-screen bg-cover bg-center text-gray-100 overflow-x-hidden w-screen max-w-[100vw] relative">
        {/* POPUP MODAL */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black rounded-lg shadow-lg p-6 w-80 text-center">
              <p className="text-lg mb-4">{popupMessage}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}

        <div className="py-8 flex flex-col items-center shadow-md bg-[#5d7d99]">
          <div className="flex items-center max-w-7xl w-full px-2 gap-10 sm:gap-20 flex-wrap md:flex-nowrap">
            <div className="flex justify-center sm:justify-start w-full sm:w-auto">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-15 animate-bounce"
              />
            </div>
            <div className="flex w-full border-2 border-black rounded-full overflow-hidden">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter at least 3 ingredients (e.g., turmeric powder, tomato, onion)"
                className="flex-grow p-3 rounded-l-lg text-black placeholder-gray-400"
              />
              <button
                onClick={handleSearch}
                className={`text-white px-8 py-3 rounded-r-full transition text-sm w-32 text-center ${enteredIngredients.length >= 3
                  ? "bg-green-500 hover:bg-green-600"
                  : enteredIngredients.length === 2
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 z-10 bg-white bg-opacity-70 flex justify-center items-center">     
            <div className="loader-bounce">
              <div></div><div></div><div></div>
            </div>
          </div>
        )}

        {/* body */}
        <div className="mb-8"></div>

        {suggested.length === 0 && (
          <div className="relative overflow-hidden h-[500px]">
            <img
              src={sliderImages[currentSlide]}
              alt="Food Slide"
              className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              key={currentSlide}
            />

            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
              <h2
                className="text-4xl sm:text-5xl text-white font-bold text-center drop-shadow-lg font-[Vivaldi] animate-fade-in-up"
                key={`text-${currentSlide}`}
              >
                {sliderTexts[currentSlide]}
              </h2>
            </div>
          </div>
        )}


        {/* After searching data */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 mb-8 bg-white">
          {suggested.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => openRecipe(recipe.id)}
              className="bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden transition hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-56 object-cover sm:h-64 lg:h-72"
              />
              <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="text-lg font-bold text-black hover:text-blue-600">{recipe.title}</h3>
                <button
                  onClick={() => openRecipe(recipe.id)}
                  className="text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  See Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

    </>

  );
};

export default Home;