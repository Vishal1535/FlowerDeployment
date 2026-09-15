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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      {/* ================= CREATE FLOWER POPUP ================= */}

      <CreateFlower />
      <CreateBouquet/>

      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}

        <div
          className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        "
        >
          <div>
            <h1
              className="
              text-2xl
              sm:text-3xl
              font-bold
              text-gray-900
            "
            >
              Products
            </h1>

            <p
              className="
              text-sm
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
              flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-gray-900
              text-white
              font-semibold
              hover:bg-gray-800
              transition
              shadow-sm
            "
          >
            <Plus size={18} />

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
          p-2
          mb-6
        "
        >
          <div className="grid grid-cols-2 gap-2">
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
                gap-2
                py-3
                rounded-xl
                font-semibold
                transition-all

                ${
                  activeType === "flower"
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-500 hover:bg-gray-50"
                }
              `}
            >
              <Flower2 size={19} />
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
                gap-2
                py-3
                rounded-xl
                font-semibold
                transition-all

                ${
                  activeType === "bouquet"
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-500 hover:bg-gray-50"
                }
              `}
            >
              <Package size={19} />
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
          p-4
          mb-6
        "
        >
          <div className="relative">
            <Search
              size={19}
              className="
                absolute
                left-4
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
                h-12
                pl-11
                pr-4
                rounded-xl
                border
                border-gray-200
                outline-none
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
        "
        >
          {/* ================= SECTION HEADER ================= */}

          <div
            className="
            p-5
            border-b
            border-gray-100
          "
          >
            <div
              className="
              flex
              items-center
              justify-between
            "
            >
              <div>
                <h2
                  className="
                  text-lg
                  font-bold
                  text-gray-900
                "
                >
                  {activeType === "flower" ? "Flowers" : "Bouquets"}
                </h2>

                <p
                  className="
                  text-sm
                  text-gray-500
                  mt-1
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
                px-3
                py-1
                rounded-full
                bg-gray-100
                text-xs
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
              py-20
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
                text-sm
                text-gray-500
                mt-4
              "
              >
                Loading products...
              </p>
            </div>
          ) : products.length > 0 ? (
            /* ================= PRODUCT GRID ================= */

            <div className="p-5">
              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
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
      gap-3
      mt-8
    "
  >
    {/* Previous */}

    <button
      type="button"
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className="
        px-4
        py-2
        rounded-xl
        border
        border-gray-200
        text-sm
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
        px-4
        py-2
        rounded-xl
        bg-gray-900
        text-white
        text-sm
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
        px-4
        py-2
        rounded-xl
        border
        border-gray-200
        text-sm
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
              py-20
              px-6
              text-center
            "
            >
              <div
                className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-gray-100
                flex
                items-center
                justify-center
                mb-4
              "
              >
                {activeType === "flower" ? (
                  <Flower2 size={28} className="text-gray-500" />
                ) : (
                  <Package size={28} className="text-gray-500" />
                )}
              </div>

              <h3
                className="
                text-lg
                font-semibold
                text-gray-900
              "
              >
                No {activeType === "flower" ? "flowers" : "bouquets"} found
              </h3>

              <p
                className="
                text-sm
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
