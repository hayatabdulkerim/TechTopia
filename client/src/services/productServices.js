export const fetchAllProducts = async () => {
  const res = await fetch("http://localhost:4000/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};

//
