import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setError(null);

      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update local global state user
      dispatch({ type: "LOGIN", payload: json });
    }
    setIsLoading(false);
  };

  return { login, isLoading, error };
};
