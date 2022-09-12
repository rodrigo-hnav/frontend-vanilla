import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { router } from "./router/index.routes";

window.addEventListener("hashchange", () => {
  router(window.location.hash);
});

function inicio() {
  router("#/categorys");
}
inicio()
