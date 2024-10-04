import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, fullName);
    if(!isLoading){
        setEmail("");
        setPassword("");
        setFullName("");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

    <label>Full Name</label>
      <input
        type="text"
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
      />

      <button className={isLoading.toString()}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
