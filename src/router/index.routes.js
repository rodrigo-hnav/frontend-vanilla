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

    default: {
      return content.appendChild(pages.notFound());
    }
  }
};
export { router };