import axios from "axios";

// Se crea una instancia de axios para poder utilizar las peticiones en cualquier parte del proyecto
const productsApi = axios.create({
  baseURL: "http://localhost:3000/products",
});

// Funcion para obtener todos los productos
export const getProducts = async () => {
  const res = await productsApi.get("/");
  return res.data;
};

export const createProduct = (product) => productsApi.post("/", product);

export const deleteProduct = (id) => productsApi.delete(`/${id}`);

export const updateProduct = (product) => productsApi.put(`/${product.id}`, product);