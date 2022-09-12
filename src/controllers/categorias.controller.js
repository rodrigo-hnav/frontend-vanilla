import { router } from "../router/index.routes";
import {API_URL} from '../config.js'

const loadCategorys = async () => {
  try {
    const response = await fetch(API_URL +"/categorys");
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const category = async () => {
  const categorys = await loadCategorys();
  if (category.message == "Category not found") {
    return;
  }
  const listTabElement = document.querySelector("#list-tab");

  let categorias = [];
  const initCategory = async () => {
    categorias = categorys;
    renderListItems(categorias);
  };

  function renderListItems(categorias) {
    let itemsString = ` <a class="list-group-item list-group-item-action" data-value="0"  id="list-all-list" data-bs-toggle="list" href="#list-all" role="tab" aria-controls="list-all">Todos las categorias</a>`;
    itemsString += createListItems(categorias);
    listTabElement.innerHTML = itemsString;
    const listGroupItems = document.querySelectorAll("a.list-group-item");

    listGroupItems.forEach((item) => {
      if (item.id !== "list-all-list") {
        item.addEventListener("click", () => {
          router("#/productbycategory", item.dataset.value);
        });
      } else {
        item.addEventListener("click", () => {
          router("#/productlistall");
        });
      }
    });
  }

  const createListItems = (categorias) =>
    categorias
      .map(
        (cat) =>
          ` <a class="list-group-item list-group-item-action" data-value="${cat.id}"  id="list-${cat.name}-list" data-bs-toggle="list" href="#list-${cat.name}" role="tab" aria-controls="list-${cat.name}">${cat.name}</a>`
      )
      .join(" ");

  initCategory();
  return;
};

export default category;
