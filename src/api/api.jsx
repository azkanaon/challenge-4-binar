import axios from "axios";

// var dari .env
const url = import.meta.env.VITE_REACT_BASEURL;
const token = import.meta.env.VITE_REACT_TOKEN;

//mengambil data sesuai tipe movie nya
export const getMovieList = async (type) => {
  const movies = await axios.get(`${url}/movie/${type}`, {
    headers: { Authorization: "Bearer " + token },
  });
  return movies.data.results;
};

// mengambil data trending
export const getTrendingMovieList = async () => {
  const movies = await axios.get(`${url}/trending/movie/day?`, {
    headers: { Authorization: "Bearer " + token },
  });
  return movies.data.results;
};

// mengambil hasil data search
export const searchMovie = async (q) => {
  const search = await axios.get(`${url}/search/movie?query=${q}`, {
    headers: { Authorization: "Bearer " + token },
  });
  return search.data.results;
};

// mengambil detail movie
export const detailMovie = async (id) => {
  const getDetail = await axios.get(`${url}/movie/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
  return getDetail.data;
};

// mengambil actor pada film
export const creditsMovie = async (id) => {
  const getDetail = await axios.get(`${url}/movie/${id}/credits`, {
    headers: { Authorization: "Bearer " + token },
  });
  return getDetail.data.cast;
};

// mengambil video dari api sesuai id
export const getVideo = async (id) => {
  const getDetail = await axios.get(`${url}/movie/${id}/videos`, {
    headers: { Authorization: "Bearer " + token },
  });
  return getDetail.data.results;
};
