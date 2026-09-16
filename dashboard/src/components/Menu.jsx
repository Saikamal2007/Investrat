import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/spool.png";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
const Menu = ({ user }) => {
  const [selectedMenu,setSelectedMenu] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleSelectMenu = (idx) => {
    setSelectedMenu(idx);
  };
  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  }
  const handleLogout = async () => {
    await axios.post(`${API_URL}/auth/logout`);
    window.location.replace(`${FRONTEND_URL}/`);
  };

  const menuClass="menu";
  const activeMenuClass="menu selected";
  return (
    <div className="menu-container">
      <img src={logo} style={{ width: "50px" }} alt="Logo" />
      <div className="menus">
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={() => handleSelectMenu(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" style={{ textDecoration: "none", color: "inherit" }} onClick={() => handleSelectMenu(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" style={{ textDecoration: "none", color: "inherit" }} onClick={() => handleSelectMenu(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" style={{ textDecoration: "none", color: "inherit" }} onClick={() => handleSelectMenu(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" style={{ textDecoration: "none", color: "inherit" }} onClick={() => handleSelectMenu(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/apps" style={{ textDecoration: "none", color: "inherit" }} onClick={() => handleSelectMenu(5)}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">IU</div>
          <p className="username">{user.username}</p>
        </div>
        {isProfileOpen && (
          <div className="profile-dropdown">
            <p>{user.email}</p>
            <button type="button" onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
