import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabIcon = ({ name, color, focused, size }) => {
  return (
    <Ionicons
      name={focused ? name : `${name}-outline`}
      color={color}
      size={size}
    />
  );
};
export default TabIcon;
