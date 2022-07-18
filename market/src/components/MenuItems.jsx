import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "left",
      }}
    >
      <Menu.Item key="/create">
        <NavLink to="/create"> New Collection </NavLink>
      </Menu.Item>
      <Menu.Item key="/market">
        <NavLink to="/market"> Market</NavLink>
      </Menu.Item>
      <Menu.Item key="/profile">
        <NavLink to="/profile"> Profile</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
