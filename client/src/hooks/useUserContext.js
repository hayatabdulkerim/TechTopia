import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
      const context = useContext(UserContext);

      if (!context) {
        // this error will be thrown when you try to access the context but you did not wrap the application with this context
        throw Error(
          "use UserContext must be used inside a UserContextProvider",
        );
      }

      return context;
}