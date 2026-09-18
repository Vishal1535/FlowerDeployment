import React, { useEffect } from 'react'
import { OccasionCategories } from './OccasionCategories/OccasionCategories'
import { FlowerCarousel } from './Flower/FlowerCarousel'
import { BouquetSlider } from './BouquetHero/BouquetSlider'
import { BouquetCarousel } from './BouquetHero/BouquetCarousel'
import { ComboBouquetCarousel } from './SpecialBouquet/ComboBouquet/ComboBouquetCarousel'
import { WoolenBouquetCarousel } from './SpecialBouquet/Woolen/WoolenBouquetCarousel'
import { FlowerPackaging } from './SpecialBouquet/FlowerPackaging/FlowerPackaging'

import { AIGiftAssistant } from '../Ai/AIGiftAssistant'

export const Hero = () => {
 
 
  return (
  <>
  <OccasionCategories/>
  <BouquetSlider/>
  <FlowerCarousel/>
  <BouquetCarousel/>
  <ComboBouquetCarousel/>
  <WoolenBouquetCarousel/>
  <FlowerPackaging/>
  <AIGiftAssistant/>
  
  </>
  )
}
