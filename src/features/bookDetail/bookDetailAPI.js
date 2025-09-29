import api from "../../apiService";

export async function fetchBookByIdAPI(id) {
  const response = await api.get(`/books/${id}`);
  return response.data;
}
