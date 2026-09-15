import { createSlice } from "@reduxjs/toolkit";

import {
  CreateCardThunk,
  UpdateCardThunk,
  DeleteCardThunk,
  GetAllCardThunk,
  GetSingleCardThunk,
  GetCardByOccasionThunk,
} from "./CardApi";

const initialState = {
  cards: [],
  singleCard: null,

  loading: false,
  error: null,
  success: false,
  message: "",

  isCreateCardPopupOpen: false,
  isEditCardPopupOpen: false,
  isDeleteCardPopupOpen: false,

  selectedCard: null,
};

const CardSlice = createSlice({
  name: "card",

  initialState,

  reducers: {
  // ================= CREATE POPUP =================

  openCreateCardPopup: (state) => {
    state.isCreateCardPopupOpen = true;
  },

  closeCreateCardPopup: (state) => {
    state.isCreateCardPopupOpen = false;
  },

  // ================= EDIT POPUP =================

  openEditCardPopup: (state, action) => {
    state.isEditCardPopupOpen = true;
    state.selectedCard = action.payload;
  },

  closeEditCardPopup: (state) => {
    state.isEditCardPopupOpen = false;
    state.selectedCard = null;
  },

  // ================= DELETE POPUP =================

  openDeleteCardPopup: (state, action) => {
    state.isDeleteCardPopupOpen = true;
    state.selectedCard = action.payload;
  },

  closeDeleteCardPopup: (state) => {
    state.isDeleteCardPopupOpen = false;
    state.selectedCard = null;
  },

  // ================= CLEAR =================

  clearCardError: (state) => {
    state.error = null;
  },

  clearCardMessage: (state) => {
    state.message = "";
  },

  clearCardSuccess: (state) => {
    state.success = false;
  },
},

  extraReducers: (builder) => {
    // =========================
    // CREATE CARD
    // =========================

    builder
      .addCase(CreateCardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(CreateCardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.card) {
          state.cards.unshift(action.payload.card);
        }
      })

      .addCase(CreateCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // UPDATE CARD
    // =========================

    builder
      .addCase(UpdateCardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(UpdateCardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const updatedCard = action.payload.card;

        if (updatedCard) {
          const index = state.cards.findIndex(
            (card) => card._id === updatedCard._id
          );

          if (index !== -1) {
            state.cards[index] = updatedCard;
          }

          if (
            state.singleCard?._id === updatedCard._id
          ) {
            state.singleCard = updatedCard;
          }
        }
      })

      .addCase(UpdateCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // DELETE CARD
    // =========================

    builder
      .addCase(DeleteCardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(DeleteCardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const deletedId = action.meta.arg;

        state.cards = state.cards.filter(
          (card) => card._id !== deletedId
        );

        if (state.singleCard?._id === deletedId) {
          state.singleCard = null;
        }
      })

      .addCase(DeleteCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =========================
    // GET ALL CARDS
    // =========================

    builder
      .addCase(GetAllCardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllCardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload.cards || [];
      })

      .addCase(GetAllCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // GET SINGLE CARD
    // =========================

    builder
      .addCase(GetSingleCardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetSingleCardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCard = action.payload.card || null;
      })

      .addCase(GetSingleCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleCard = null;
      });

    // =========================
    // GET CARD BY OCCASION
    // =========================

    builder
      .addCase(
        GetCardByOccasionThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        GetCardByOccasionThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.cards = action.payload.cards || [];
        }
      )

      .addCase(
        GetCardByOccasionThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export const {
  openCreateCardPopup,
  closeCreateCardPopup,

  openEditCardPopup,
  closeEditCardPopup,

  openDeleteCardPopup,
  closeDeleteCardPopup,

  clearCardError,
  clearCardMessage,
  clearCardSuccess,
} = CardSlice.actions;

const CardReducer = CardSlice.reducer;

export default CardReducer;