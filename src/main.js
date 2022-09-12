import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { router } from "./router/index.routes";

window.addEventListener("hashchange", () => {
  router(window.location.hash);
});
document
  .getElementById("formBuscar")
  .addEventListener("submit", buscarProducto);

function buscarProducto(e) {
  router("#/productbyname");
  e.preventDefault();
}
function inicio() {
  router("#/categorys");
  router("#/productbyaz")
}
inicio()



