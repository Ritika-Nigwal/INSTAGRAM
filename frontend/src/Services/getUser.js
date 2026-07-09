
export const getCurrentUser = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
