
import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllWishlistThunk,
  FlowerWishlistThunk,
  BouquetWishlistThunk,
  ComboBouquetWishlistThunk,
  FlowerInBoxWishlistThunk,
  FlowerInSleeveWishlistThunk,
  WoolenWishlistThunk,
} from "./WhislistApi";

const initialState = {
  // ================= FLOWER =================
  flowerWishlist: [],
  flowerLoading: false,
  flowerError: null,

  // ================= BOUQUET =================
  bouquetWishlist: [],
  bouquetLoading: false,
  bouquetError: null,

  // ================= COMBO BOUQUET =================
  comboBouquetWishlist: [],
  comboBouquetLoading: false,
  comboBouquetError: null,

  // ================= FLOWER IN BOX =================
  flowerInBoxWishlist: [],
  flowerInBoxLoading: false,
  flowerInBoxError: null,

  // ================= FLOWER IN SLEEVE =================
  flowerInSleeveWishlist: [],
  flowerInSleeveLoading: false,
  flowerInSleeveError: null,

  // ================= WOOLEN =================
  woolenWishlist: [],
  woolenLoading: false,
  woolenError: null,

  // ================= GET ALL WISHLIST =================
  getAllWishlistLoading: false,
  getAllWishlistError: null,
};

const WishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // =====================================================
    // GET ALL WISHLIST
    // =====================================================

    builder
      .addCase(GetAllWishlistThunk.pending, (state) => {
        state.getAllWishlistLoading = true;
        state.getAllWishlistError = null;
      })

      .addCase(GetAllWishlistThunk.fulfilled, (state, action) => {
        state.getAllWishlistLoading = false;
        state.getAllWishlistError = null;

        const wishlist = action.payload?.wishlist;

        if (wishlist) {
          state.flowerWishlist =
            wishlist.Flower || [];

          state.bouquetWishlist =
            wishlist.Bouquet || [];

          state.comboBouquetWishlist =
            wishlist.ComboBouquet || [];

          state.flowerInBoxWishlist =
            wishlist.FlowerInBox || [];

          state.flowerInSleeveWishlist =
            wishlist.FlowerInSleeve || [];

          state.woolenWishlist =
            wishlist.Woolen || [];
        }
      })

      .addCase(GetAllWishlistThunk.rejected, (state, action) => {
        state.getAllWishlistLoading = false;

        state.getAllWishlistError =
          action.payload || "Failed to fetch wishlist";
      });


    // =====================================================
    // FLOWER WISHLIST
    // =====================================================

    builder
      .addCase(FlowerWishlistThunk.pending, (state) => {
        state.flowerLoading = true;
        state.flowerError = null;
      })

      .addCase(FlowerWishlistThunk.fulfilled, (state, action) => {
        state.flowerLoading = false;

        if (action.payload?.wishlist) {
          state.flowerWishlist =
            action.payload.wishlist.Flower || [];
        }
      })

      .addCase(FlowerWishlistThunk.rejected, (state, action) => {
        state.flowerLoading = false;

        state.flowerError =
          action.payload || "Failed to update flower wishlist";
      });


    // =====================================================
    // BOUQUET WISHLIST
    // =====================================================

    builder
      .addCase(BouquetWishlistThunk.pending, (state) => {
        state.bouquetLoading = true;
        state.bouquetError = null;
      })

      .addCase(BouquetWishlistThunk.fulfilled, (state, action) => {
        state.bouquetLoading = false;

        if (action.payload?.wishlist) {
          state.bouquetWishlist =
            action.payload.wishlist.Bouquet || [];
        }
      })

      .addCase(BouquetWishlistThunk.rejected, (state, action) => {
        state.bouquetLoading = false;

        state.bouquetError =
          action.payload || "Failed to update bouquet wishlist";
      });


    // =====================================================
    // COMBO BOUQUET WISHLIST
    // =====================================================

    builder
      .addCase(ComboBouquetWishlistThunk.pending, (state) => {
        state.comboBouquetLoading = true;
        state.comboBouquetError = null;
      })

      .addCase(
        ComboBouquetWishlistThunk.fulfilled,
        (state, action) => {
          state.comboBouquetLoading = false;

          if (action.payload?.wishlist) {
            state.comboBouquetWishlist =
              action.payload.wishlist.ComboBouquet || [];
          }
        }
      )

      .addCase(
        ComboBouquetWishlistThunk.rejected,
        (state, action) => {
          state.comboBouquetLoading = false;

          state.comboBouquetError =
            action.payload ||
            "Failed to update combo bouquet wishlist";
        }
      );


    // =====================================================
    // FLOWER IN BOX WISHLIST
    // =====================================================

    builder
      .addCase(FlowerInBoxWishlistThunk.pending, (state) => {
        state.flowerInBoxLoading = true;
        state.flowerInBoxError = null;
      })

      .addCase(
        FlowerInBoxWishlistThunk.fulfilled,
        (state, action) => {
          state.flowerInBoxLoading = false;

          if (action.payload?.wishlist) {
            state.flowerInBoxWishlist =
              action.payload.wishlist.FlowerInBox || [];
          }
        }
      )

      .addCase(
        FlowerInBoxWishlistThunk.rejected,
        (state, action) => {
          state.flowerInBoxLoading = false;

          state.flowerInBoxError =
            action.payload ||
            "Failed to update flower in box wishlist";
        }
      );


    // =====================================================
    // FLOWER IN SLEEVE WISHLIST
    // =====================================================

    builder
      .addCase(FlowerInSleeveWishlistThunk.pending, (state) => {
        state.flowerInSleeveLoading = true;
        state.flowerInSleeveError = null;
      })

      .addCase(
        FlowerInSleeveWishlistThunk.fulfilled,
        (state, action) => {
          state.flowerInSleeveLoading = false;

          if (action.payload?.wishlist) {
            state.flowerInSleeveWishlist =
              action.payload.wishlist.FlowerInSleeve || [];
          }
        }
      )

      .addCase(
        FlowerInSleeveWishlistThunk.rejected,
        (state, action) => {
          state.flowerInSleeveLoading = false;

          state.flowerInSleeveError =
            action.payload ||
            "Failed to update flower in sleeve wishlist";
        }
      );


    // =====================================================
    // WOOLEN WISHLIST
    // =====================================================

    builder
      .addCase(WoolenWishlistThunk.pending, (state) => {
        state.woolenLoading = true;
        state.woolenError = null;
      })

      .addCase(WoolenWishlistThunk.fulfilled, (state, action) => {
        state.woolenLoading = false;

        if (action.payload?.wishlist) {
          state.woolenWishlist =
            action.payload.wishlist.Woolen || [];
        }
      })

      .addCase(WoolenWishlistThunk.rejected, (state, action) => {
        state.woolenLoading = false;

        state.woolenError =
          action.payload || "Failed to update woolen wishlist";
      });
  },
});

const WishlistReducer = WishlistSlice.reducer;

export default WishlistReducer;

