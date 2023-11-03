import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, updateProduct } from "../api/products";

// funcion para obtener los productos
const Products = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    // Devuelve los datos ordenados de mayor a menor de los productos
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalidar la cache y trae los datos nuevos, los compara y actualiza la intefaz
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Invalidar la cache y trae los datos nuevos, los compara y actualiza la intefaz
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={() => {
          deleteProductMutation.mutate(product.id);
        }}
      >
        Delete
      </button>
      <input
        id={product.id}
        type="checkbox"
        checked={product.inStock}
        onChange={(event) => {
          updateProductMutation.mutate({
            ...product,
            inStock: event.target.checked,
          });
        }}
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ));
};
export default Products;
