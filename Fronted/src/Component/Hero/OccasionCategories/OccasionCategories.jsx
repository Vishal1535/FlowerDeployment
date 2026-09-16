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

  // =========================================
  // CATEGORY CLICK
  // =========================================

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

  // =========================================
  // GET ACTIVE CATEGORY
  // =========================================

  const getActiveCategory = () => {
    if (location.pathname === "/") {
      return "All";
    }

    const occasion = location.pathname.split("/")[2];

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
    <section
      className="
        w-full
        max-w-full
        overflow-hidden
        bg-white
        text-gray-900
        py-6
        min-[380px]:py-7
        sm:py-8
        px-3
        min-[380px]:px-4
        sm:px-6
      "
    >

      {/* ================================= */}
      {/* HEADING */}
      {/* ================================= */}

      <div
        className="
          text-center
          mb-5
          min-[380px]:mb-6
          sm:mb-7
          px-2
        "
      >

        <h2
          className="
            text-xl
            min-[380px]:text-2xl
            sm:text-3xl
            md:text-4xl
            font-extrabold
            text-gray-900
            leading-tight
            tracking-tight
          "
        >
          Shop By{" "}
          <span className="text-pink-500">
            Occasion
          </span>
        </h2>

        <p
          className="
            text-xs
            min-[380px]:text-sm
            sm:text-base
            text-gray-500
            mt-2
            leading-relaxed
          "
        >
          Find the perfect flowers for every special moment
        </p>

      </div>

      {/* ================================= */}
      {/* CATEGORIES */}
      {/* ================================= */}

      <div
        className="
          flex
          flex-wrap
          justify-center
          items-center
          gap-2
          min-[380px]:gap-2.5
          sm:gap-3
          max-w-5xl
          mx-auto
        "
      >

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              handleCategoryClick(category)
            }
            className={`
              px-3.5
              min-[380px]:px-4
              sm:px-5
              py-2
              min-[380px]:py-2.5
              sm:py-2.5
              rounded-full
              text-xs
              min-[380px]:text-sm
              sm:text-sm
              font-semibold
              border
              whitespace-nowrap
              transition-all
              duration-200
              active:scale-95

              ${
                activeCategory === category
                  ? `
                    bg-pink-600
                    text-white
                    border-pink-600
                    shadow-md
                    shadow-pink-200
                  `
                  : `
                    bg-white
                    text-gray-600
                    border-gray-200
                    shadow-sm
                    hover:border-pink-300
                    hover:text-pink-600
                    hover:bg-pink-50
                    hover:shadow-md
                  `
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