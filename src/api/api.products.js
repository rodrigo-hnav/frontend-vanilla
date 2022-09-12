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