import React from "react";
import { useEffect, useState } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSclice";

function MenuItemsList() {
  // const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);

  useEffect(() => {
    // fetch("")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setMenuItems(data.result); // result is the array of data
    //   });
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container row">
      {/* conditional rendering */}
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemsList;
