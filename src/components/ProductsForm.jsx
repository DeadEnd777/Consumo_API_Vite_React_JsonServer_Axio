import React from "react";
// Importar useMutation para crear un producto
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Importar el formulario
import { createProduct } from "../api/products";

const ProductsForm = () => {
  const queryClient = useQueryClient();
  // Funcion para crear un producto
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("Product added!");
      // Invalidar la cache y trae los datos nuevos, los compara y actualiza la intefaz
      queryClient.invalidateQueries("products");
    },
  });

  // Funcion para crear un producto
  const handleSubmit = (event) => {
    event.preventDefault();
    // Obtener los datos del formulario
    const formData = new FormData(event.target);
    // Convertir los datos en un objeto
    const data = Object.fromEntries(formData);
    // Crear el producto
    addProductMutation.mutate({
      // Se copian todos los datos del producto y se agrega el estado de stock
      ...data,
      inStock: true,
    });
  };

  return (
    // Formulario para crear un producto
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />

      <button>Add Product</button>
    </form>
  );
};

export default ProductsForm;
