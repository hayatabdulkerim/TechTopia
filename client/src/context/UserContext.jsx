import { createContext, useReducer, useEffect } from "react";
import { fetchUsers } from "../services/userService";

export const UserContext = createContext();

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };

    case "ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUsers = async () => {
    dispatch({ type: "LOADING" });

    try {
      const data = await fetchUsers();
      dispatch({ type: "SET_USERS", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};
