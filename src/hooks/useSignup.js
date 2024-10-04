import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, fullName) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fullName
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

  return { signup, isLoading, error };
};
