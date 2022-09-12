import { API_URL } from "../config.js";

//listar productos
export const loadProducts = async () => {
  try {
    const response = await fetch(API_URL + "/products");
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};
//filtro por nombre de producto
export const loadProductByName = async () => {
  try {
    const txtBuscar = document.getElementById("txtBuscar").value;
    const response = await fetch(API_URL + "/productsbyname/" + txtBuscar);
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

//filtro de productos por categoria y orden por nombre asc
export const loadProductByCategoryAZ = async (idCategory) => {
    try {
      const response = await fetch(API_URL + "/productbycategory/" + idCategory);
      return await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  
//filtro de productos por categoria y orden asc
export const loadProductByPriceCategory = async ({ id, order }) => {
    try {
      const response = await fetch(
        API_URL + "/productbyorderpricecategory/" + id + "&" + order
      );
      return await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
