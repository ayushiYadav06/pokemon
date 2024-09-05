import {
  ADD_POKEMON,
  DELETE_POKEMON,
  FAIL_REQUEST,
  GET_POKEMON_LIST,
  GET_POKEMON_OBJ,
  MAKE_REQUEST,
  UPDATE_POKEMON,
} from "./actionType";

const initialState = {
  loading: true,
  pokemonlist: [],
  pokemonObj: {},
  errMessage: "",
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errMessage: action.payload,
      };

    case GET_POKEMON_LIST:
      return {
        ...state,
        pokemonlist: action.payload,
        loading: false,
        errMessage: "",
        pokemonObj: {},
      };

    case DELETE_POKEMON:
      return {
        ...state,
        loading: false,
      };

    case ADD_POKEMON:
      return {
        ...state,
        loading: false,
      };

      case UPDATE_POKEMON:
        return {
          ...state,
          loading: false,
        };
        case GET_POKEMON_OBJ:
          return {
            ...state,
            loading: false,
            pokemonObj: action.payload,
            errMessage: "",
          };
    default:
      return state;
  }
};
