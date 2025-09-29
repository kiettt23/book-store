import api from "../../apiService";

// Hàm fetch books từ server (json-server)
export async function fetchBooksAPI(page, query, limit = 10) {
  let url = `/books?_page=${page}&_limit=${limit}`;
  if (query) url += `&q=${query}`;
  const response = await api.get(url);
  return response.data;
}
