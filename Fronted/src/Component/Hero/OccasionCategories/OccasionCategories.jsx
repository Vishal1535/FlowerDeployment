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
    <section className="w-full py-6 sm:py-8 px-3 sm:px-4 overflow-hidden">

      <div className="text-center mb-5 sm:mb-6 px-2">

        <h2 className="text-xl min-[380px]:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Shop By Occasion
        </h2>

        <p className="text-xs min-[380px]:text-sm text-gray-500 mt-2 leading-relaxed">
          Find the perfect flowers for every special moment
        </p>

      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className={`
              px-3.5
              min-[380px]:px-4
              sm:px-5
              py-2
              sm:py-2.5
              rounded-full
              text-xs
              min-[380px]:text-sm
              font-semibold
              border
              whitespace-nowrap
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