import Home from "./home.controller";
import NotFound from "./404.controller";
import  category  from "./categorias.controller";


const pages = {
  home: Home,
  notFound: NotFound,
  categorys: category,

};

export { pages };
