import axios from "axios";

const pokeApi = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

export const getPokemon = (pokemon: string) => {
  return pokeApi.get(`pokemon/${pokemon}`);
};

export const getBerry = (berry: string) => {
  return pokeApi.get(`berry/${berry}`);
};

export default pokeApi;
