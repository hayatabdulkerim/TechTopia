import { useAuthContext } from "./useAuthContext";
import { useProductsContext } from "./useProductsContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: productsDispatch } = useProductsContext(); // bc we can not have two dispatches in one file

  // the logout function

  const logout = () => {
    //remove user from the local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    productsDispatch({ type: "SET_PRODUCTS", payload: null }); // clearing the global state context when we log out so that we dont see a flash of other peoples workouts when we log in and when we try to fetch the workouts assossiated with us(the currntly logged in user)
  };
  return { logout };
};
