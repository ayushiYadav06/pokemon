import {
  ADD_POKEMON,
  DELETE_POKEMON,
  FAIL_REQUEST,
  GET_POKEMON_LIST,
  GET_POKEMON_OBJ,
  MAKE_REQUEST,
  UPDATE_POKEMON,
} from "./actionType";
import axios from "axios";
export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};
export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};
export const getPokemonList = (data) => {
  return {
    type: GET_POKEMON_LIST,
    payload: data,
  };
};

export const AddPokemon = () => {
  return {
    type: ADD_POKEMON,
  };
};

export const deletePokemon = () => {
  return {
    type: DELETE_POKEMON,
  };
};

export const updatePokemon = () => {
  return {
    type: UPDATE_POKEMON,
  };
};
export const getPokemonObj = (data) => {
  return {
    type: GET_POKEMON_OBJ,
    payload: data,
  };
};
export const fetchPokemonList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get("http://localhost:4500/pokemon/getAllPokemon")
      .then((response) => {
        const pokemonList = response.data;
        dispatch(getPokemonList(pokemonList));
      })
      .catch((err) => dispatch(failRequest(err.message)));
  };
};

export const removePokemon = (id) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .delete(`http://localhost:4500/pokemon/deletePokemon/${id}`)
      .then((response) => {
        dispatch(deletePokemon());
      })
      .catch((err) => dispatch(failRequest(err.message)));
  };
};

export const NewPokemon = (data) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .post(`http://localhost:4500/pokemon/addNewPokemon`, data)
      .then((response) => {
        dispatch(AddPokemon());
      })
      .catch((err) => dispatch(failRequest(err.message)));
  };
};

export const UpdatedPokemon = (data, id) => {
  console.log(id)
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .put(`http://localhost:4500/pokemon/updatePokemon/${id}`, data)
      .then((response) => {
        dispatch(UpdatedPokemon());
      })
      .catch((err) => dispatch(failRequest(err.message)));
  };
};
