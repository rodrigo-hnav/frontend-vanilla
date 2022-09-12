import { pages } from "../controllers/index";

//enrutador puede importar una vista o desde el contolador renderizar contenido
let content = document.getElementById("root");
const router = async (route, data) => {
  //limpia contenido
  content.innerHTML = "";
  content.innerText = "";

  switch (route) {
    case "#/": {
      return content.appendChild(pages.home());
    }
    case "#/categorys": {
      return await pages.categorys();
    }
    case "#/productbycategory": {
      return content.appendChild(await pages.productByCategory(data));
    }
    case "#/productbyname": {
      return content.appendChild(await pages.productByName());
    }
    case "#/productbypriceasc": {
      return content.appendChild(await pages.productByPriceOrder("asc"));
    }
    case "#/productbypricedes": {
      return content.appendChild(await pages.productByPriceOrder("desc"));
    }
    case "#/productlistall": {
      return content.appendChild(await pages.productListAll());
    }
    default: {
      return content.appendChild(pages.notFound());
    }
  }
};
export { router };
