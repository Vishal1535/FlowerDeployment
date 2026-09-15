import { Navigate } from "react-router-dom";

import { Card } from "../Component/GiftItems/Card/Card";
import { MiniCupCake } from "../Component/GiftItems/MIniCupCake/MiniCupCake";
import { Chocolate } from "../Component/GiftItems/Chocolate/Chocolate";
import { GiftItem } from "../Component/GiftItems/GiftItem";

const Gift = [
  {
    path: "/admin/GiftItem",
    element: <GiftItem />,

    children: [
      {
        index: true,
        element: <Navigate to="card" replace />,
      },

      {
        path: "card",
        element: <Card />,
      },

      {
        path: "chocolate",
        element: <Chocolate />,
      },

      {
        path: "mini-cupcake",
        element: <MiniCupCake />,
      },
    ],
  },
];

export default Gift;