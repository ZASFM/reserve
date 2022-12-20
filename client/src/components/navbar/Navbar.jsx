import { useAuthProvider } from "../../context/AuthContext";
import "./navbar.css"

const Navbar = () => {
  const {user}=useAuthProvider();
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Book a book</span>
        {user? user.name :<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>}
      </div>
    </div>
  )
}

export default Navbar