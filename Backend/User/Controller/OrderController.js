import OrderModel from "../Model/OrderModel.js";
import userModel from "../../models/User.js";

import BouquetAddToCartModel from "../Model/AddToCart/BouquetAddToCartModel.js";
import CardAddToCartModel from "../Model/AddToCart/CardAddToCartModel.js";
import ChocolateAddToCartModel from "../Model/AddToCart/ChocolateAddToCartModel.js";
import ComboBouquetAddToCartModel from "../Model/AddToCart/ComboBoquetAddToCartModel.js";
import FlowerAddToCartModel from "../Model/AddToCart/FlowerAddtoCartModel.js";
import FlowerInBoxAddToCartModel from "../Model/AddToCart/FLowerInBox.js";
import FlowerInSleeveAddToCartModel from "../Model/AddToCart/FlowerInSleeveAddToC artModel.js";
import MiniCupcakeAddToCartModel from "../Model/AddToCart/MiniCupCakeAddToCartModel.js";
import WoolenBouquetAddToCartModel from "../Model/AddToCart/WoolenBouquetAddToCartModel.js";

import sendEmail from "../../configs/nodemailer.js";

// =====================================================
// EMAIL HELPER
// =====================================================

const sendOrderEmail = async ({
  to,
  subject,
  title,
  message,
  order,
  deliveryBoyName = "",
  deliveryBoyPhone = "",
}) => {
  try {
    // =================================================
    // ORDER ITEMS
    // =================================================

    const itemsHtml =
      order?.items
        ?.map(
          (item) => `
            <tr>
              <td style="
                padding:10px;
                border-bottom:1px solid #f3f4f6;
                font-size:14px;
                color:#374151;
              ">
                ${item?.name || "Flower Product"}
              </td>

              <td style="
                padding:10px;
                border-bottom:1px solid #f3f4f6;
                text-align:center;
                font-size:14px;
                color:#374151;
              ">
                ${item?.quantity || 1}
              </td>

              <td style="
                padding:10px;
                border-bottom:1px solid #f3f4f6;
                text-align:right;
                font-size:14px;
                color:#374151;
              ">
                ₹${Number(item?.totalPrice || 0).toLocaleString("en-IN")}
              </td>
            </tr>
          `,
        )
        .join("") || "";

    // =================================================
    // ADDRESS
    // =================================================

    const address = order?.address;

    const addressHtml =
      typeof address === "object" && address
        ? `
          <div style="
            background:#f9fafb;
            border:1px solid #f3f4f6;
            border-radius:12px;
            padding:15px;
            margin-top:10px;
          ">

            <strong style="
              color:#111827;
            ">
              ${address?.name || address?.fullName || "Delivery Address"}
            </strong>

            <div style="
              margin-top:5px;
              color:#6b7280;
              line-height:1.6;
              font-size:13px;
            ">

              ${address?.address || address?.street || ""}

              <br />

              ${address?.city || ""}
              ${address?.city && address?.state ? ", " : ""}
              ${address?.state || ""}

              ${address?.pincode ? ` - ${address.pincode}` : ""}

              ${address?.phone ? `<br />Phone: ${address.phone}` : ""}

            </div>

          </div>
        `
        : `
          <div style="
            background:#f9fafb;
            border:1px solid #f3f4f6;
            border-radius:12px;
            padding:15px;
            margin-top:10px;
            color:#6b7280;
            font-size:13px;
          ">
            ${address || "Address not available"}
          </div>
        `;

    // =================================================
    // DELIVERY DATE
    // =================================================

    const deliveryDateHtml = order?.deliverDate
      ? `
        <div style="
          margin-top:20px;
          padding:15px;
          background:#f0fdf4;
          border:1px solid #bbf7d0;
          border-radius:12px;
        ">

          <div style="
            color:#6b7280;
            font-size:11px;
          ">
            Expected Delivery
          </div>

          <div style="
            margin-top:5px;
            color:#16a34a;
            font-weight:bold;
            font-size:14px;
          ">
            ${new Date(order.deliverDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>

        </div>
      `
      : "";

    // =================================================
    // DELIVERY BOY
    // =================================================

    const deliveryBoyHtml =
      deliveryBoyName || deliveryBoyPhone
        ? `
          <div style="
            margin-top:20px;
            padding:18px;
            background:#fff7ed;
            border:1px solid #fed7aa;
            border-radius:14px;
          ">

            <div style="
              color:#9a3412;
              font-size:11px;
              text-transform:uppercase;
              font-weight:bold;
            ">
              Delivery Partner
            </div>

            ${
              deliveryBoyName
                ? `
                  <div style="
                    margin-top:8px;
                    color:#111827;
                    font-size:15px;
                    font-weight:bold;
                  ">
                    👤 ${deliveryBoyName}
                  </div>
                `
                : ""
            }

            ${
              deliveryBoyPhone
                ? `
                  <div style="
                    margin-top:6px;
                    color:#374151;
                    font-size:14px;
                  ">
                    📞 ${deliveryBoyPhone}
                  </div>
                `
                : ""
            }

          </div>
        `
        : "";

    // =================================================
    // HTML
    // =================================================

    const html = `
      <!DOCTYPE html>

      <html>

        <head>

          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>${title}</title>

        </head>

        <body style="
          margin:0;
          padding:0;
          background:#fff7f9;
          font-family:Arial,Helvetica,sans-serif;
        ">

          <div style="
            max-width:650px;
            margin:30px auto;
            background:#ffffff;
            border-radius:20px;
            overflow:hidden;
            border:1px solid #fce7f3;
          ">

            <!-- HEADER -->

            <div style="
              background:linear-gradient(
                135deg,
                #ec4899,
                #f43f5e
              );
              padding:30px 25px;
              text-align:center;
              color:white;
            ">

              <div style="
                font-size:35px;
                margin-bottom:8px;
              ">
                🌸
              </div>

              <h1 style="
                margin:0;
                font-size:26px;
              ">
                Flower
              </h1>

              <p style="
                margin:8px 0 0;
                font-size:13px;
                opacity:0.9;
              ">
                Bloom with love
              </p>

            </div>

            <!-- CONTENT -->

            <div style="
              padding:30px 25px;
            ">

              <h2 style="
                margin:0;
                color:#111827;
                font-size:22px;
              ">
                ${title}
              </h2>

              <p style="
                margin-top:12px;
                color:#6b7280;
                font-size:14px;
                line-height:1.6;
                white-space:pre-line;
              ">
                ${message}
              </p>

              <!-- ORDER ID -->

              <div style="
                margin-top:20px;
                padding:15px;
                background:#fdf2f8;
                border:1px solid #fbcfe8;
                border-radius:12px;
              ">

                <div style="
                  color:#9ca3af;
                  font-size:11px;
                  text-transform:uppercase;
                ">
                  Order ID
                </div>

                <div style="
                  margin-top:5px;
                  color:#db2777;
                  font-weight:bold;
                  font-size:14px;
                  word-break:break-all;
                ">
                  #${order?._id || "N/A"}
                </div>

              </div>

              <!-- ORDER STATUS -->

              <div style="
                margin-top:15px;
                padding:15px;
                background:#f9fafb;
                border-radius:12px;
              ">

                <div style="
                  color:#9ca3af;
                  font-size:11px;
                  text-transform:uppercase;
                ">
                  Order Status
                </div>

                <div style="
                  margin-top:5px;
                  color:#111827;
                  font-weight:bold;
                  font-size:15px;
                  text-transform:capitalize;
                ">
                  ${order?.orderStatus?.replaceAll("_", " ") || "N/A"}
                </div>

              </div>

              <!-- DELIVERY BOY -->

              ${deliveryBoyHtml}

              <!-- ITEMS -->

              ${
                order?.items?.length
                  ? `
                    <h3 style="
                      margin-top:25px;
                      color:#111827;
                      font-size:16px;
                    ">
                      Ordered Items
                    </h3>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        border-collapse:collapse;
                        margin-top:10px;
                      "
                    >

                      <thead>

                        <tr>

                          <th style="
                            padding:10px;
                            text-align:left;
                            background:#fdf2f8;
                            color:#6b7280;
                            font-size:12px;
                          ">
                            Product
                          </th>

                          <th style="
                            padding:10px;
                            text-align:center;
                            background:#fdf2f8;
                            color:#6b7280;
                            font-size:12px;
                          ">
                            Qty
                          </th>

                          <th style="
                            padding:10px;
                            text-align:right;
                            background:#fdf2f8;
                            color:#6b7280;
                            font-size:12px;
                          ">
                            Total
                          </th>

                        </tr>

                      </thead>

                      <tbody>
                        ${itemsHtml}
                      </tbody>

                    </table>
                  `
                  : ""
              }

              <!-- TOTAL -->

              <div style="
                margin-top:20px;
                padding:18px;
                background:#fdf2f8;
                border-radius:14px;
              ">

                <div style="
                  color:#9ca3af;
                  font-size:11px;
                ">
                  Order Total
                </div>

                <div style="
                  margin-top:5px;
                  color:#db2777;
                  font-size:24px;
                  font-weight:bold;
                ">
                  ₹${Number(order?.totalAmount || 0).toLocaleString("en-IN")}
                </div>

              </div>

              <!-- DELIVERY ADDRESS -->

              ${
                order?.address
                  ? `
                    <h3 style="
                      margin-top:25px;
                      color:#111827;
                      font-size:16px;
                    ">
                      Delivery Address
                    </h3>

                    ${addressHtml}
                  `
                  : ""
              }

              <!-- DELIVERY DATE -->

              ${deliveryDateHtml}

              <!-- FOOTER MESSAGE -->

              <p style="
                margin-top:30px;
                color:#6b7280;
                font-size:13px;
                line-height:1.6;
              ">
                Thank you for shopping with
                <strong style="color:#db2777;">
                  Flower
                </strong>.
                We hope your flowers make your moment beautiful. 🌸
              </p>

            </div>

            <!-- FOOTER -->

            <div style="
              padding:20px;
              background:#fff1f2;
              text-align:center;
              color:#9ca3af;
              font-size:11px;
            ">
              This is an automated email. Please do not reply.
            </div>

          </div>

        </body>

      </html>
    `;

    await sendEmail({
      to,
      subject,
      html,
    });

    console.log(`Order email sent successfully to ${to}`);
  } catch (error) {
    console.error("Order email error:", error.message);
  }
};

// =====================================================
// CREATE ORDER
// =====================================================

export const CreateOrder = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.email) {
      return res.status(400).json({
        success: false,
        message: "User email not found",
      });
    }

    const {
      items,
      address,
      subtotal,
      paymentMethod,
      paymentType,
      paidAmount = 0,
      deliveryType = "standard",
      paymentOrderId = "",
      paymentId = "",
      paymentSignature = "",
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    const numericSubtotal = Number(subtotal);

    if (!Number.isFinite(numericSubtotal) || numericSubtotal < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid subtotal is required",
      });
    }

    if (paymentMethod !== "online") {
      return res.status(400).json({
        success: false,
        message: "Only online payment is supported",
      });
    }

    if (!["full", "partial"].includes(paymentType)) {
      return res.status(400).json({
        success: false,
        message: "Valid payment type is required",
      });
    }

    if (!["standard", "tomorrow"].includes(deliveryType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery type",
      });
    }

    const today = new Date();

    let deliverDate;
    let deliveryCharge = 0;

    if (deliveryType === "tomorrow") {
      deliverDate = new Date(today);

      deliverDate.setDate(deliverDate.getDate() + 1);

      deliveryCharge = 99;
    } else {
      const randomDays = Math.floor(Math.random() * 6) + 2;

      deliverDate = new Date(today);

      deliverDate.setDate(deliverDate.getDate() + randomDays);

      deliveryCharge = 0;
    }

    deliverDate.setHours(12, 0, 0, 0);

    const totalAmount = numericSubtotal + deliveryCharge;

    const numericPaidAmount = Number(paidAmount);

    if (
      !Number.isFinite(numericPaidAmount) ||
      numericPaidAmount < 0 ||
      numericPaidAmount > totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid paid amount",
      });
    }

    let paymentStatus = "pending";

    if (numericPaidAmount >= totalAmount) {
      paymentStatus = "paid";
    } else if (numericPaidAmount > 0) {
      paymentStatus = "partial";
    }

    const remainingAmount = Math.max(totalAmount - numericPaidAmount, 0);

    const normalizedItems = items.map((item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (!item.product || !item.productType || !item.name) {
        throw new Error("Invalid order item");
      }

      if (!Number.isFinite(price) || price < 0) {
        throw new Error(`Invalid price for ${item.name}`);
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(`Invalid quantity for ${item.name}`);
      }

      return {
        productType: item.productType,
        product: item.product,
        name: item.name,
        image: item.image || "",
        price,
        quantity,
        totalPrice: price * quantity,
      };
    });

    const order = await OrderModel.create({
      user: userId,

      items: normalizedItems,

      address,

      subtotal: numericSubtotal,

      deliveryCharge,

      totalAmount,

      deliveryType,

      deliverDate,

      paymentMethod: "online",

      paymentType,

      paidAmount: numericPaidAmount,

      remainingAmount,

      paymentStatus,

      orderStatus: "confirmed",

      paymentOrderId,

      paymentId,

      paymentSignature,
    });

    await Promise.all([
      BouquetAddToCartModel.deleteMany({
        user: userId,
      }),

      CardAddToCartModel.deleteMany({
        user: userId,
      }),

      ChocolateAddToCartModel.deleteMany({
        user: userId,
      }),

      ComboBouquetAddToCartModel.deleteMany({
        user: userId,
      }),

      FlowerAddToCartModel.deleteMany({
        user: userId,
      }),

      FlowerInBoxAddToCartModel.deleteMany({
        user: userId,
      }),

      FlowerInSleeveAddToCartModel.deleteMany({
        user: userId,
      }),

      MiniCupcakeAddToCartModel.deleteMany({
        user: userId,
      }),

      WoolenBouquetAddToCartModel.deleteMany({
        user: userId,
      }),
    ]);

    await sendOrderEmail({
      to: user.email,

      subject: "🌸 Your Flower Order Has Been Confirmed",

      title: "Order Confirmed! 🌸",

      message: `Hi ${
        user.name || "there"
      }, your order has been successfully placed and confirmed. We will keep you updated about your order.`,

      order,
    });

    return res.status(201).json({
      success: true,

      message: "Order created successfully",

      order,
    });
  } catch (error) {
    console.error("CreateOrder Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to create order",

      error: error.message,
    });
  }
};

// =====================================================
// GET MY ORDERS
// =====================================================

export const GetMyOrders = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const orders = await OrderModel.find({
      user: userId,
    })
      .populate("address")
      .populate("deliveryBoy", "name phone address")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("GetMyOrders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// =====================================================
// CANCEL ORDER
// =====================================================

export const CancelOrders = async (req, res) => {
  try {
    const { orderId } = req.params;

    const userId = req.id;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to cancel this order",
      });
    }

    if (!["pending", "confirmed", "processing"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "This order cannot be cancelled now",
      });
    }

    const user = await userModel.findById(userId);

    await OrderModel.findByIdAndDelete(orderId);

    if (user?.email) {
      await sendOrderEmail({
        to: user.email,

        subject: "Order Cancelled - Flower",

        title: "Order Cancelled",

        message: `Hi ${
          user.name || "there"
        }, your Flower order has been successfully cancelled as requested.`,

        order: {
          ...order.toObject(),

          orderStatus: "cancelled",
        },
      });
    }

    return res.status(200).json({
      success: true,

      message: "Order cancelled successfully",

      orderId,
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to cancel order",

      error: error.message,
    });
  }
};

// =====================================================
// CHANGE ORDER STATUS
// =====================================================

export const ChangeOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const { status } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const user = await userModel.findById(order.user);

    order.orderStatus = status;

    order.statusChangedAt = new Date();

    await order.save();

    // =================================================
    // EMAIL
    // =================================================

    if (user?.email) {
      let emailTitle = "Order Status Updated";

      let emailMessage = `Hi ${
        user.name || "there"
      }, your Flower order status has been updated to ${status.replaceAll(
        "_",
        " ",
      )}.`;

      let deliveryBoyName = "";
      let deliveryBoyPhone = "";

      // =================================================
      // DELIVERY BOY DETAILS
      // =================================================

      if (status === "out_for_delivery" || status === "delivered") {
        try {
          const orderForEmail = await OrderModel.findById(orderId).populate({
            path: "deliveryBoy",
            populate: {
              path: "user",
              select: "name phone",
            },
          });

          const deliveryBoy = orderForEmail?.deliveryBoy;

          deliveryBoyName =
            deliveryBoy?.user?.name ||
            deliveryBoy?.name ||
            "";

          deliveryBoyPhone =
            deliveryBoy?.user?.phone ||
            deliveryBoy?.phone ||
            "";
        } catch (deliveryError) {
          console.error(
            "Delivery boy email details error:",
            deliveryError.message,
          );
        }
      }

      // =================================================
      // STATUS WISE EMAIL
      // =================================================

      switch (status) {
        case "confirmed":
          emailTitle = "Your Order Is Confirmed 🌸";

          emailMessage = `Great news, ${
            user.name || "there"
          }! Your Flower order has been confirmed and will be prepared soon.`;

          break;

        case "processing":
          emailTitle = "Your Order Is Being Prepared 🌷";

          emailMessage =
            "Your Flower order is currently being prepared. We are getting everything ready for delivery.";

          break;

        case "shipped":
          emailTitle = "Your Order Has Been Shipped 📦";

          emailMessage =
            "Your Flower order has been shipped and is now on its way to you.";

          break;

        case "out_for_delivery":
          emailTitle = "Your Order Is Out for Delivery 🚚";

          emailMessage = `Hi ${
            user.name || "there"
          }, your Flower order is out for delivery today. 🌸

Aaj aapka order aa sakta hai. Please apna phone available rakhein aur delivery ke liye ready rahein.

We hope your flowers reach you safely and make your moment beautiful. 💐`;

          break;

        case "delivered":
          emailTitle = "Your Order Has Been Delivered 🌸";

          emailMessage = `Hi ${
            user.name || "there"
          }, your Flower order has been delivered successfully. We hope you love it! 💐`;

          break;

        case "cancelled":
          emailTitle = "Your Order Has Been Cancelled";

          emailMessage = `Hi ${
            user.name || "there"
          }, your Flower order has been cancelled.`;

          break;

        case "pending":
          emailTitle = "Your Order Is Pending";

          emailMessage = `Hi ${
            user.name || "there"
          }, your Flower order is currently pending confirmation.`;

          break;

        default:
          break;
      }

      // =================================================
      // SEND EMAIL
      // =================================================

      await sendOrderEmail({
        to: user.email,

        subject: `Flower Order Update: ${status.replaceAll("_", " ")}`,

        title: emailTitle,

        message: emailMessage,

        order,

        deliveryBoyName,

        deliveryBoyPhone,
      });
    }

    return res.status(200).json({
      success: true,

      message: "Order status updated successfully",

      order,
    });
  } catch (error) {
    console.error("Change Order Status Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to update order status",

      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ORDERS - OWNER / ADMIN
// =====================================================

export const GetAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email phone role")
      .populate("address")
      .populate("deliveryBoy", "name phone email vehicleType vehicleNumber")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      message: "All users orders fetched successfully",

      count: orders.length,

      orders,
    });
  } catch (error) {
    console.error("GetAllOrders Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch all orders",

      error: error.message,
    });
  }
};

// =====================================================
// CREATE SINGLE PRODUCT ORDER
// =====================================================

export const CreateSingleProductOrder = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.email) {
      return res.status(400).json({
        success: false,
        message: "User email not found",
      });
    }

    const {
      product,
      productType,
      name,
      image,
      quantity = 1,
      price,
      address,
      paymentMethod,
      paymentType,
      paidAmount = 0,
      deliveryType = "standard",
      paymentOrderId = "",
      paymentId = "",
      paymentSignature = "",
    } = req.body;

    if (!product || !productType || !name) {
      return res.status(400).json({
        success: false,
        message: "Product information is required",
      });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid product price is required",
      });
    }

    const numericQuantity = Number(quantity);

    if (!Number.isInteger(numericQuantity) || numericQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    if (paymentMethod !== "online") {
      return res.status(400).json({
        success: false,
        message: "Only online payment is supported",
      });
    }

    if (!["full", "partial"].includes(paymentType)) {
      return res.status(400).json({
        success: false,
        message: "Valid payment type is required",
      });
    }

    if (!["standard", "tomorrow"].includes(deliveryType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery type",
      });
    }

    const today = new Date();

    let deliverDate;

    let deliveryCharge = 0;

    if (deliveryType === "tomorrow") {
      deliverDate = new Date(today);

      deliverDate.setDate(deliverDate.getDate() + 1);

      deliveryCharge = 99;
    } else {
      const randomDays = Math.floor(Math.random() * 6) + 2;

      deliverDate = new Date(today);

      deliverDate.setDate(deliverDate.getDate() + randomDays);

      deliveryCharge = 0;
    }

    deliverDate.setHours(12, 0, 0, 0);

    const numericSubtotal = numericPrice * numericQuantity;

    const totalAmount = numericSubtotal + deliveryCharge;

    const numericPaidAmount = Number(paidAmount);

    if (
      !Number.isFinite(numericPaidAmount) ||
      numericPaidAmount < 0 ||
      numericPaidAmount > totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid paid amount",
      });
    }

    let paymentStatus = "pending";

    if (numericPaidAmount >= totalAmount) {
      paymentStatus = "paid";
    } else if (numericPaidAmount > 0) {
      paymentStatus = "partial";
    }

    const remainingAmount = Math.max(totalAmount - numericPaidAmount, 0);

    const orderItem = {
      productType,

      product,

      name,

      image: image || "",

      price: numericPrice,

      quantity: numericQuantity,

      totalPrice: numericPrice * numericQuantity,
    };

    const order = await OrderModel.create({
      user: userId,

      items: [orderItem],

      address,

      subtotal: numericSubtotal,

      deliveryCharge,

      totalAmount,

      deliveryType,

      deliverDate,

      paymentMethod: "online",

      paymentType,

      paidAmount: numericPaidAmount,

      remainingAmount,

      paymentStatus,

      orderStatus: "confirmed",

      paymentOrderId,

      paymentId,

      paymentSignature,
    });

    // BUY NOW
    // Cart clear nahi hoga.

    await sendOrderEmail({
      to: user.email,

      subject: "🌸 Your Flower Order Has Been Confirmed",

      title: "Order Confirmed! 🌸",

      message: `Hi ${
        user.name || "there"
      }, your order has been successfully placed and confirmed. We will keep you updated about your order.`,

      order,
    });

    return res.status(201).json({
      success: true,

      message: "Single product order created successfully",

      order,
    });
  } catch (error) {
    console.error("CreateSingleProductOrder Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to create single product order",

      error: error.message,
    });
  }
};