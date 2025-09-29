import api from "../../apiService";

export async function fetchFavoritesAPI() {
  const res = await api.get("/favorites");
  return res.data;
}

export async function addFavoriteAPI(book) {
  const res = await api.post("/favorites", book);
  return res.data;
}

export async function removeFavoriteAPI(id) {
  await api.delete(`/favorites/${id}`);
  return id;
}
