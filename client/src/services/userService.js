export const fetchUsers = async () => {
  const response = await fetch("http://localhost:4000/api/user");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return await response.json();
};
