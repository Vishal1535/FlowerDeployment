import React from "react";
import { SingleBouquet } from "../Component/Hero/BouquetHero/SingleBouquet";
import { SingleComboBouquet } from "../Component/Hero/SpecialBouquet/ComboBouquet/SingleComboBouquet";
import { SingleWoolenBouquet } from "../Component/Hero/SpecialBouquet/Woolen/SingleWoolenBouquet";
import { SingleFlowerInBox } from "../Component/Hero/SpecialBouquet/FlowerPackaging/FlowerInBox/SingleFlowerInBox";
import { SingleFlowerInSleeve } from "../Component/Hero/SpecialBouquet/FlowerPackaging/FlowerInSleeve/SingleFlowerInSleeve";

const SingleProduct = [
  {
    path: "/bouquet/:id",
    element: <SingleBouquet />,
  },
  {
    path:"/combo-bouquet/:id",
    element:<SingleComboBouquet/>
  },
  {
    path:"/woolen-bouquet/:id",
    element:<SingleWoolenBouquet/>
  },
  {
    path:"/flower-in-box/:id",
    element:<SingleFlowerInBox/>
  },
  {
    path:"/flower-in-sleeve/:id",
    element:<SingleFlowerInSleeve/>
  }
  
];

export default SingleProduct;