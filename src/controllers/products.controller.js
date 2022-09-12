import {
  loadProducts,
  loadProductByName,
  loadProductByCategoryAZ,
  loadProductByPriceCategory,
  loadProductByPrice,
} from "../api/api.products.js";

export const productByCategory = async (data) => {
  const divOrderBy = document.getElementById("p_orderby");
  let products;
  let typeOrderCategory;

  switch (divOrderBy.dataset.order) {
    case "p-down":
      typeOrderCategory = {
        id: data,
        order: "asc",
      };
      products = await loadProductByPriceCategory(typeOrderCategory);
      break;
    case "p-up":
      typeOrderCategory = {
        id: data,
        order: "desc",
      };
      products = await loadProductByPriceCategory(typeOrderCategory);
      break;
    case "a-z":
      products = await loadProductByCategoryAZ(data);
      break;

    default:
      break;
  }
  //limpia input de busqueda
  const txtBuscar = document.getElementById("txtBuscar");
  txtBuscar.value = "";
  if (products.message == "Product not found by category") {
    return;
  }

  return renderProductsDiv(products);
};

export const productByName = async () => {
  const divOrderBy = document.getElementById("p_orderby");
  let products;

  switch (divOrderBy.dataset.order) {
    case "p-down":
      products = await loadProductByNamePrice("asc");
      break;
    case "p-up":
      products = await loadProductByNamePrice("desc");
      break;
    case "a-z":
      products = await loadProductByName();
      break;

    default:
      break;
  }

  return renderProductsDiv(products);
};

export const productByPriceOrder = async (data) => {
  const products = await loadProductByPrice(data);
  if (products.message == "Product not found") {
    return;
  }
  return renderProductsDiv(products);
};

export const productListAll = async () => {
  const divOrderBy = document.getElementById("p_orderby");
  let products;

  switch (divOrderBy.dataset.order) {
    case "p-down":
      products = await loadProductByPrice("asc");
      break;
    case "p-up":
      products = await loadProductByPrice("desc");
      break;
    case "a-z":
      products = await loadProducts();
      break;

    default:
      break;
  }

  return renderProductsDiv(products);
};

//filtro por nombre de producto y ordenados por precio
export const loadProductByNamePrice = async (order) => {
  try {
    const txtBuscar = document.getElementById("txtBuscar").value;
    if (txtBuscar.length > 0) {
      const response = await fetch(
        API_URL + "/productsbynamepriceorder/" + txtBuscar + "&" + order
      );
      return await response.json();
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const productByAz = async () => {
  const divOrderBy = document.getElementById("p_orderby");
  divOrderBy.innerHTML = `<p>A-Z</p>
    <p ><span class="material-symbols-outlined">
    arrow_downward
      </span> </p>`;
  divOrderBy.dataset.order = "a-z";
  const txtBuscar = document.getElementById("txtBuscar").value;
  if (txtBuscar.length > 0) {
    return productByName();
  } else {
    let idCategorySelected = getActiveListItem();
    if (idCategorySelected > 0) {
      const products = await loadProductByCategoryAZ(idCategorySelected);
      return renderProductsDiv(products);
    } else {
      const products = await loadProducts();
      return renderProductsDiv(products);
    }
  }
};

export const productByPriceOrderCategory = async (typeOrder) => {
  let idCategorySelected = getActiveListItem();

  const typeOrderCategory = {
    id: idCategorySelected,
    order: typeOrder,
  };

  const divOrderBy = document.getElementById("p_orderby");
  if (typeOrder == "asc") {
    divOrderBy.innerHTML = `<p  >Precio</p>
      <p ><span class="material-symbols-outlined">
        arrow_downward
        </span> </p>`;
    divOrderBy.dataset.order = "p-down";
  } else {
    divOrderBy.innerHTML = `<p  >Precio</p>
      <p ><span class="material-symbols-outlined">
        arrow_upward
        </span> </p>`;
    divOrderBy.dataset.order = "p-up";
  }
  const txtBuscar = document.getElementById("txtBuscar").value;
  if (txtBuscar.length > 0) {
    return productByName();
  } else {
    if (idCategorySelected > 0) {
      const products = await loadProductByPriceCategory(typeOrderCategory);
      return renderProductsDiv(products);
    } else {
      //loadProductByPrice
      const products = await loadProductByPrice(typeOrder);
      return renderProductsDiv(products);
    }
  }
};

//verificar categoria
const getActiveListItem = () => {
  const listGroupItems = document.querySelectorAll("a.list-group-item");
  let idCategory = 0;
  listGroupItems.forEach((item) => {
    if (item.id !== "list-all-list") {
      if (item.className === "list-group-item list-group-item-action active") {
        idCategory = item.dataset.value;
      }
    }
  });
  return idCategory;
};

// renderizar lista de productos

const createListProducts = (cardProduct) => {
  return cardProduct
    .map((prod) => {
      return (
        `<div class="col-sm">` +
        `<div class="card h-100">` +
        `<img class="mt-2 card-img-top img-fluid" src="${
          prod.url_image != null ? prod.url_image : ""
        }" class="card-img-top" alt="${prod.name}">` +
        `<div class="card-body">` +
        `<h6 class="card-title">${prod.name}</h6>` +
        `<p class="card-text">$${prod.price}</p>` +
        `</div>` +
        `</div>` +
        `</div> `
      );
    })
    .join(" ");
};

const renderProductsDiv = async (products) => {
  const divElement = document.createElement("div");

  if (products.message == "Product not found") {
    divElement.innerHTML = `<h6>No se encuentra el producto que buscas, favor intenta con otro producto</h6>`;
    return divElement;
  }
  divElement.classList.add("row");
  divElement.classList.add("row-cols-1");
  divElement.classList.add("row-cols-md-4");
  divElement.classList.add("g-4");

  const initProducts = async () => {
    renderProducts(products);
  };

  function renderProducts(products) {
    const itemsString = createListProducts(products);
    divElement.innerHTML = itemsString;
  }

  initProducts();
  return divElement;
};
