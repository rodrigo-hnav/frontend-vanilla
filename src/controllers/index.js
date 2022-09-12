import Home from "./home.controller";
import NotFound from "./404.controller";
import { 
  productByCategory, 
  productByName,
  productByPriceOrder,
  productListAll,
  productByAz,
  productByPriceOrderCategory,
} from "./products.controller";
import  category  from "./categorias.controller";


const pages = {
  home: Home,
  notFound: NotFound,
  categorys: category,
  productByCategory,
  productByName,
  productByPriceOrder,
  productListAll,
  productByAz,
  productByPriceOrderCategory,
};

export { pages };
