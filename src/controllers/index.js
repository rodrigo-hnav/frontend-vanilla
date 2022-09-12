import Home from "./home.controller";
import NotFound from "./404.controller";
import  category  from "./categorias.controller";
import { 

  productByName,

} from "./products.controller";

const pages = {
  home: Home,
  notFound: NotFound,
  categorys: category,
  productByName,
};

export { pages };
