import Home from "./home.controller";
import NotFound from "./404.controller";
import  category  from "./categorias.controller";
import { 
  productByCategory, 
  productByName,
  productByAz,
  productListAll
} from "./products.controller";

const pages = {
  home: Home,
  notFound: NotFound,
  categorys: category,
  productByName,
  productByCategory,
  productByAz,
  productListAll,
};

export { pages };
