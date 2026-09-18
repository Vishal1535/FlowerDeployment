 import { OccasionProducts } from "../User/Product/Occasion/OccasionProducts"
import { Search } from "../User/Product/Search/Search"
 export const ProductRoute=[
    {
        path:"/occasion/:occasion",
        element:<OccasionProducts/>
    },
    {
        path:"/search",
        element:<Search/>
    }
]