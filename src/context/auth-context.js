import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: false,
  Login: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //   const logoutHandler = () => {
  //     setIsAuthenticated(false);
  //   };

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        Login: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
