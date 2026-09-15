import React, { useEffect, useState } from "react";
import { Flower2, Package, Plus, Search } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { openCreateFlowerPopup } from "../../Store/flowerSlice/FlowerSlice";

import { CreateFlower } from "./Flowers/CreateFlower";

import { GetAllFlowersThunk } from "../../Store/flowerSlice/FlowerApi";

import { ProductCard } from "./Flowers/ProductCard";
import { BoquetProduct } from "./Bouquet/BoquetProduct";
import { CreateBouquet } from "./Bouquet/CreateBouquet";
import { openCreateBouquetPopup } from "../../Store/Bouquest/BouquestSlice";
import { AllBouquetsThunk } from "../../Store/Bouquest/BouquestApi";
import { useNavigate } from "react-router-dom";

export const Product = () => {
  const dispatch = useDispatch();
  const [search,setSearch]=useState("")
  const navigate=useNavigate()
  const { isAuthorized, userInfo } = useSelector((state) => state.user);

useEffect(() => {
  // User login nahi hai
  // Ya user admin nahi hai
  if (!isAuthorized || userInfo?.role !== "admin") {
    navigate("/", {
      replace: true,
    });
  }
}, [isAuthorized, userInfo, navigate]);


  // ================= ACTIVE PRODUCT TYPE =================

  const [activeType, setActiveType] = useState("flower");

  // ================= FLOWER PAGINATION =================

  const [page, setPage] = useState(1);

  // ================= TEMPORARY BOUQUET STATE =================

  // Baad mein Bouquet Redux Slice se replace kar dena
  const [bouquet, setBouet] = useState([]);

  // ================= FLOWER REDUX DATA =================

  const { loading, flowers } = useSelector((state) => state.flower);
  const {bouquets}=useSelector((state)=>state.bouquet)
  
  

  // ================= GET FLOWERS =================

  useEffect(() => {
    const data = {
      page,
      limit: 10,
    };

    dispatch(GetAllFlowersThunk(data));

    dispatch(AllBouquetsThunk(data))
  }, [page, dispatch]);

  // ================= ADD PRODUCT =================

  const handleAddProduct = () => {
    if (activeType === "flower") {
      dispatch(openCreateFlowerPopup());
    } else {
      // Bouquet slice banne ke baad
      // yahan openCreateBouquetPopup() kar dena
      dispatch(openCreateBouquetPopup())
      // alert("Bouquet feature will be added soon");
    }
  };

  // ================= CURRENT PRODUCTS =================

  const products =
  activeType === "flower"
    ? (flowers || []).filter((flower) => {
        const query = search.toLowerCase().trim();

        if (!query) return true;

        return (
          flower.name?.toLowerCase().includes(query) ||
          flower.description?.toLowerCase().includes(query) ||
          flower.category?.toLowerCase().includes(query) ||
          flower.color?.toLowerCase().includes(query)
        );
      })
    : (bouquets || []).filter((bouquet) => {
        const query = search.toLowerCase().trim();

        if (!query) return true;

        return (
          bouquet.name?.toLowerCase().includes(query) ||
          bouquet.description?.toLowerCase().includes(query) ||
          bouquet.category?.toLowerCase().includes(query) ||
          bouquet.occasion?.toLowerCase().includes(query) ||
          bouquet.bouquetType?.toLowerCase().includes(query)
        );
      });

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-gray-50 px-3 py-4 min-[380px]:px-4 sm:px-6 lg:px-8 sm:py-6">
      {/* ================= CREATE FLOWER POPUP ================= */}

      <CreateFlower />
      <CreateBouquet/>

      <div className="max-w-7xl mx-auto min-w-0">
        {/* ================= HEADER ================= */}

        <div
          className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          sm:gap-4
          mb-4
          sm:mb-6
        "
        >
          <div className="min-w-0">
            <h1
              className="
              text-xl
              min-[380px]:text-2xl
              sm:text-3xl
              font-bold
              text-gray-900
            "
            >
              Products
            </h1>

            <p
              className="
              text-xs
              sm:text-sm
              text-gray-500
              mt-1
            "
            >
              Manage your flowers and bouquets
            </p>
          </div>

          {/* ================= ADD PRODUCT ================= */}

          <button
            type="button"
            onClick={handleAddProduct}
            className="
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-2
              px-4
              sm:px-5
              py-2.5
              sm:py-3
              rounded-xl
              bg-gray-900
              text-white
              text-sm
              font-semibold
              hover:bg-gray-800
              transition
              shadow-sm
            "
          >
            <Plus size={17} className="sm:w-[18px] sm:h-[18px]" />

            {activeType === "flower" ? "Add Flower" : "Add Bouquet"}
          </button>
        </div>

        {/* ================= PRODUCT TYPE ================= */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          p-1.5
          sm:p-2
          mb-4
          sm:mb-6
        "
        >
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {/* ================= FLOWERS ================= */}

            <button
              type="button"
              onClick={() => {
                setActiveType("flower");
                setPage(1);
                setSearch("")
              }}
              className={`
                flex
                items-center
                justify-center
                gap-1.5
                sm:gap-2
                py-2.5
                sm:py-3
                rounded-xl
                text-sm
                sm:text-base
                font-semibold
                transition-all

                ${
                  activeType === "flower"
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-500 hover:bg-gray-50"
                }
              `}
            >
              <Flower2 size={17} className="sm:w-[19px] sm:h-[19px]" />
              Flowers
            </button>

            {/* ================= BOUQUETS ================= */}

            <button
              type="button"
              onClick={() => {
                setActiveType("bouquet");
                setPage(1);
                setSearch("")
              }}
              className={`
                flex
                items-center
                justify-center
                gap-1.5
                sm:gap-2
                py-2.5
                sm:py-3
                rounded-xl
                text-sm
                sm:text-base
                font-semibold
                transition-all

                ${
                  activeType === "bouquet"
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-500 hover:bg-gray-50"
                }
              `}
            >
              <Package size={17} className="sm:w-[19px] sm:h-[19px]" />
              Bouquets
            </button>
          </div>
        </div>

        {/* ================= SEARCH ================= */}

        <div
          className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-3
          sm:p-4
          mb-4
          sm:mb-6
        "
        >
          <div className="relative">
            <Search
              size={18}
              className="
                absolute
                left-3
                sm:left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder={
                activeType === "flower"
                  ? "Search flowers..."
                  : "Search bouquets..."
              }
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value)
              }}
              className="
                w-full
                h-10
                sm:h-12
                pl-10
                sm:pl-11
                pr-3
                sm:pr-4
                rounded-xl
                border
                border-gray-200
                outline-none
                text-sm
                focus:border-gray-400
                focus:ring-2
                focus:ring-gray-100
              "
            />
          </div>
        </div>

        {/* ================= PRODUCT SECTION ================= */}

        <div
          className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          min-w-0
          overflow-hidden
        "
        >
          {/* ================= SECTION HEADER ================= */}

          <div
            className="
            p-4
            sm:p-5
            border-b
            border-gray-100
          "
          >
            <div
              className="
              flex
              items-center
              justify-between
              gap-3
            "
            >
              <div className="min-w-0">
                <h2
                  className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-gray-900
                "
                >
                  {activeType === "flower" ? "Flowers" : "Bouquets"}
                </h2>

                <p
                  className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                  mt-1
                  truncate
                "
                >
                  {activeType === "flower"
                    ? "Manage your flower products"
                    : "Manage your bouquet products"}
                </p>
              </div>

              {/* Product Count */}

              <span
                className="
                shrink-0
                px-2.5
                sm:px-3
                py-1
                rounded-full
                bg-gray-100
                text-[10px]
                sm:text-xs
                font-semibold
                text-gray-600
              "
              >
                {products.length} Products
              </span>
            </div>
          </div>

          {/* ================= PRODUCTS ================= */}

          {loading && products.length === 0 ? (
            /* ================= LOADING ================= */

            <div
              className="
              py-14
              sm:py-20
              text-center
            "
            >
              <span
                className="
                loading
                loading-spinner
                loading-lg
              "
              />

              <p
                className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-3
                sm:mt-4
              "
              >
                Loading products...
              </p>
            </div>
          ) : products.length > 0 ? (
            /* ================= PRODUCT GRID ================= */

            <div className="p-3 min-[380px]:p-4 sm:p-5">
              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-3
                sm:gap-5
              "
              >
                {products.map((product) =>
                  activeType === "flower" ? (
                    /* ================= FLOWER CARD ================= */

                    <ProductCard
                      key={product._id}
                      product={product}
                      type="flower"
                    />
                  ) : (
                    /* ================= BOUQUET CARD ================= */

                    <BoquetProduct key={product._id} product={product} />
                  ),
                )}
              </div>

              {/* ================= FLOWER PAGINATION ================= */}

           {products.length > 0 && (
  <div
    className="
      flex
      items-center
      justify-center
      gap-2
      sm:gap-3
      mt-6
      sm:mt-8
      flex-wrap
    "
  >
    {/* Previous */}

    <button
      type="button"
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className="
        px-3
        sm:px-4
        py-2
        rounded-xl
        border
        border-gray-200
        text-xs
        sm:text-sm
        font-semibold
        disabled:opacity-40
        disabled:cursor-not-allowed
        hover:bg-gray-50
        transition
      "
    >
      Previous
    </button>

    {/* Current Page */}

    <span
      className="
        px-3
        sm:px-4
        py-2
        rounded-xl
        bg-gray-900
        text-white
        text-xs
        sm:text-sm
        font-semibold
      "
    >
      {page}
    </span>

    {/* Next */}

    <button
      type="button"
      onClick={() => setPage((prev) => prev + 1)}
      disabled={products.length < 10}
      className="
        px-3
        sm:px-4
        py-2
        rounded-xl
        border
        border-gray-200
        text-xs
        sm:text-sm
        font-semibold
        disabled:opacity-40
        disabled:cursor-not-allowed
        hover:bg-gray-50
        transition
      "
    >
      Next
    </button>
  </div>
)}
            </div>
          ) : (
            /* ================= EMPTY STATE ================= */

            <div
              className="
              py-14
              sm:py-20
              px-4
              sm:px-6
              text-center
            "
            >
              <div
                className="
                w-14
                h-14
                sm:w-16
                sm:h-16
                mx-auto
                rounded-2xl
                bg-gray-100
                flex
                items-center
                justify-center
                mb-3
                sm:mb-4
              "
              >
                {activeType === "flower" ? (
                  <Flower2 size={25} className="sm:w-[28px] sm:h-[28px] text-gray-500" />
                ) : (
                  <Package size={25} className="sm:w-[28px] sm:h-[28px] text-gray-500" />
                )}
              </div>

              <h3
                className="
                text-base
                sm:text-lg
                font-semibold
                text-gray-900
              "
              >
                No {activeType === "flower" ? "flowers" : "bouquets"} found
              </h3>

              <p
                className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-2
              "
              >
                Start by adding your first{" "}
                {activeType === "flower" ? "flower" : "bouquet"}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};