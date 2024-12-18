import { createStore } from "redux";

const loadFavoritesFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("favorites");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn("Error loading favorites from localStorage", e);
    return [];
  }
};

// Initial state
const initialState = {
  favorites: loadFavoritesFromLocalStorage(),
};

// Action Creators
export const addFavorite = (movieId) => ({
  type: "ADD_FAVORITE",
  payload: movieId,
});

export const removeFavorite = (movieId) => ({
  type: "REMOVE_FAVORITE",
  payload: movieId,
});

// Reducer function
// Computes the new state and return it
const favoriteReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_FAVORITE":
      newState = {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      console.log("Reducer state AFTER ADD:", newState); //TODO: Log after ADD action
      break;
    case "REMOVE_FAVORITE":
      newState = {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
      console.log("Reducer state AFTER REMOVE:", newState); //TODO: Log after REMOVE action
      break;
    default:
      return state;
  }
  localStorage.setItem("favorites", JSON.stringify(newState.favorites));
  return newState;
};

// Create Redux store
const store = createStore(favoriteReducer);

export default store;
