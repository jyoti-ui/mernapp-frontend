import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };


  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>User Data</h1>
        </Link>
        <nav>
          {user ? (  
            <div className="logout">
              <span>{user.user.signup.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
