import {
    loadProducts,
    loadProductByName,
  } from "../api/api.products.js";


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
      if (txtBuscar.length > 0){
        const response = await fetch(
          API_URL + "/productsbynamepriceorder/" + txtBuscar + "&" + order
        );
        return await response.json();
      }
  
    } catch (error) {
      console.log(error.message);
    }
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
      return divElement
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
  