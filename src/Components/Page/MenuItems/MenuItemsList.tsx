import React from "react";
import { useEffect, useState } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";

function MenuItemsList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  useEffect(() => {
    fetch("https://redmangoapi.azurewebsites.net/api/MenuItem")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data.result); // result is the array of data
      });
  }, []);
  return (
    <div className="container row">
      {/* conditional rendering */}
      {menuItems.length > 0 &&
        menuItems.map((menuItem, index) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemsList;
