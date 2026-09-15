import WishlistModel from "../Model/Whislist.js";

// FLOWER WISHLIST

export const FlowerWishlistController = async (req, res) => {
  try {
    const { id } = req.params;

    let wishlist = await WishlistModel.findOne({
      user: req.id,
    });

    // Wishlist nahi hai → create
    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.id,
        Flower: [id],
      });

      return res.status(201).json({
        success: true,
        message: "Flower added to wishlist",
        wishlist,
      });
    }

    // Already present?
    const isAlreadyAdded = wishlist.Flower.some(
      (flowerId) => flowerId.toString() === id,
    );

    if (isAlreadyAdded) {
      wishlist.Flower = wishlist.Flower.filter(
        (flowerId) => flowerId.toString() !== id,
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Flower removed from wishlist",
        wishlist,
      });
    }

    // Add flower
    wishlist.Flower.push(id);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Flower added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Flower Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// BOUQUET WISHLIST

export const BouquetWishlistController = async (req, res) => {
  try {
    const { id } = req.params;

    let wishlist = await WishlistModel.findOne({
      user: req.id,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.id,
        Bouquet: [id],
      });

      return res.status(201).json({
        success: true,
        message: "Bouquet added to wishlist",
        wishlist,
      });
    }

    const isAlreadyAdded = wishlist.Bouquet.some(
      (bouquetId) => bouquetId.toString() === id,
    );

    if (isAlreadyAdded) {
      wishlist.Bouquet = wishlist.Bouquet.filter(
        (bouquetId) => bouquetId.toString() !== id,
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Bouquet removed from wishlist",
        wishlist,
      });
    }

    wishlist.Bouquet.push(id);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Bouquet added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Bouquet Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// COMBO BOUQUET WISHLIST

export const ComboBouquetWishlistController = async (req, res) => {
  try {
    const { id } = req.params;

    let wishlist = await WishlistModel.findOne({
      user: req.id,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.id,
        ComboBouquet: [id],
      });

      return res.status(201).json({
        success: true,
        message: "Combo bouquet added to wishlist",
        wishlist,
      });
    }

    const isAlreadyAdded = wishlist.ComboBouquet.some(
      (productId) => productId.toString() === id,
    );

    if (isAlreadyAdded) {
      wishlist.ComboBouquet = wishlist.ComboBouquet.filter(
        (productId) => productId.toString() !== id,
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Combo bouquet removed from wishlist",
        wishlist,
      });
    }

    wishlist.ComboBouquet.push(id);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Combo bouquet added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Combo Bouquet Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// FLOWER IN BOX WISHLIST

export const FlowerInBoxWishlistController = async (req, res) => {
  try {
    const { id } = req.params;

    let wishlist = await WishlistModel.findOne({
      user: req.id,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.id,
        FlowerInBox: [id],
      });

      return res.status(201).json({
        success: true,
        message: "Flower in box added to wishlist",
        wishlist,
      });
    }

    const isAlreadyAdded = wishlist.FlowerInBox.some(
      (productId) => productId.toString() === id,
    );

    if (isAlreadyAdded) {
      wishlist.FlowerInBox = wishlist.FlowerInBox.filter(
        (productId) => productId.toString() !== id,
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Flower in box removed from wishlist",
        wishlist,
      });
    }

    wishlist.FlowerInBox.push(id);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Flower in box added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Flower In Box Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// FLOWER IN SLEEVE WISHLIST

export const FlowerInSleeveWishlistController = async (req, res) => {
  try {
    const { id } = req.params;

    let wishlist = await WishlistModel.findOne({
      user: req.id,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.id,
        FlowerInSleeve: [id],
      });

      return res.status(201).json({
        success: true,
        message: "Flower in sleeve added to wishlist",
        wishlist,
      });
    }

    const isAlreadyAdded = wishlist.FlowerInSleeve.some(
      (productId) => productId.toString() === id,
    );

    if (isAlreadyAdded) {
      wishlist.FlowerInSleeve = wishlist.FlowerInSleeve.filter(
        (productId) => productId.toString() !== id,
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Flower in sleeve removed from wishlist",
        wishlist,
      });
    }

    wishlist.FlowerInSleeve.push(id);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Flower in sleeve added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Flower In Sleeve Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// WOOLEN WISHLIST

export const WoolenWishlistController = async (req, res) => {
  try {
    const { id } = req.params;

    let wishlist = await WishlistModel.findOne({
      user: req.id,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.id,
        Woolen: [id],
      });

      return res.status(201).json({
        success: true,
        message: "Woolen added to wishlist",
        wishlist,
      });
    }

    const isAlreadyAdded = wishlist.Woolen.some(
      (productId) => productId.toString() === id,
    );

    if (isAlreadyAdded) {
      wishlist.Woolen = wishlist.Woolen.filter(
        (productId) => productId.toString() !== id,
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Woolen removed from wishlist",
        wishlist,
      });
    }

    wishlist.Woolen.push(id);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Woolen added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Woolen Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const GetAllWishlistController = async (req, res) => {
  try {
    const wishlist = await WishlistModel.findOne({
      user: req.id,
    })
      .populate("Flower")
      .populate("Bouquet")
      .populate("ComboBouquet")
      .populate("FlowerInBox")
      .populate("FlowerInSleeve")
      .populate("Woolen");

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Get All Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};
