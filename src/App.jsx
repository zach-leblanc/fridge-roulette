import React, { useState } from 'react';

const API_KEY = "17c8551455484b16862828a983ef49d4"; // Make sure it's valid

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredients
        )}&number=10&apiKey=${API_KEY}`
      );

      if (!res.ok) {
        const message = res.status === 401
          ? 'Unauthorized – check your API key'
          : `API error: ${res.status}`;
        throw new Error(message);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format from API.');
      }

      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err.message || 'Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4">
      <h1 className="text-4xl font-extrabold text-center text-amber-700 mb-6">
        FRIDGE ROULETTE
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="e.g. eggs, milk, spinach"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button
          onClick={fetchRecipes}
          className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          {loading ? 'Browsing through your fridge...' : 'Find Recipes'}
        </button>

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:scale-105"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{recipe.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                You have: {recipe.usedIngredientCount} | Gotta go buy: {recipe.missedIngredientCount}
              </p>
              <a
                href={`https://spoonacular.com/recipes/${recipe.title
                  .toLowerCase()
                  .replace(/ /g, '-')}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 text-sm font-medium mt-2 inline-block"
              >
                View Recipe →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
