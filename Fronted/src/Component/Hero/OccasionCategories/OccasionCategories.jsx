import React from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

export const OccasionCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    "All",
    "Birthday",
    "Wedding",
    "Anniversary",
    "Valentine",
    "Congratulations",
    "Get Well Soon",
  ];

  const handleCategoryClick = (category) => {
    if (category === "All") {
      navigate("/");
      return;
    }

    navigate(
      `/occasion/${category
        .toLowerCase()
        .replaceAll(" ", "-")}`
    );
  };

  const getActiveCategory = () => {
    if (location.pathname === "/") {
      return "All";
    }

    const occasion = location.pathname
      .split("/")[2];

    if (!occasion) {
      return "All";
    }

    return occasion
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  const activeCategory = getActiveCategory();

  return (
    <section className="w-full py-8 px-4">

      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Shop By Occasion
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Find the perfect flowers for every special moment
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className={`
              px-5
              py-2.5
              rounded-full
              text-sm
              font-semibold
              border
              transition-all
              duration-200

              ${
                activeCategory === category
                  ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50"
              }
            `}
          >
            {category}
          </button>
        ))}

      </div>

    </section>
  );
};