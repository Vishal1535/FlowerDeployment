import { SpecialBouquet } from "../Component/SpecialBouquet/SpecialBouquet";
import { WoolenBouquet } from "../Component/SpecialBouquet/WoolenBouquet/WoolenBouquet";
import { ComboBouquet } from "../Component/SpecialBouquet/ComboBouquet/ComboBouquet";
import { FlowerInBox } from "../Component/SpecialBouquet/FlowerInBox/FlowerInBox";
import { FlowerSleeve } from "../Component/SpecialBouquet/FlowerSleeve/FlowerSleeve";
const SpecialBouquetRoutes = [
  {
    path: "/admin/special-bouquets",
    element: <SpecialBouquet />,
    children: [
      {
        path: "ComboBouquet",
        element: <ComboBouquet />,
      },
      {
        path: "WoolenBouquet",
        element: <WoolenBouquet />,
      },
      {
        path:"FlowerInSleeve",
        element:<FlowerSleeve/>
      },
      {
        path:'FlowerInBox',
        element:<FlowerInBox/>
      }
    ],
  },
];

export default SpecialBouquetRoutes;