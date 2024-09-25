import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import Main from "../Components/Main";
import Order from "../Components/Order";
import TabIcon from "../Components/Nav/TabIcon";
import { styled } from "styled-components/native";

const tabs = createBottomTabNavigator();

const TabNav = ({ refreshUser, userObj }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  return (
    <tabs.Navigator>
      <tabs.Screen
        name="main"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
          },
          tabBarActiveTintColor: "black",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabIcon
                name={"home"}
                color={color}
                focused={focused}
                size={22}
              />
            );
          },
        }}
      >
        {() => (
          <Main
            orderHistory={orderHistory}
            userObj={userObj}
            refreshUser={refreshUser}
          />
        )}
      </tabs.Screen>
      <tabs.Screen
        name="Order"
        options={{
          headerTitle: "주문하기",
          tabBarStyle: {
            backgroundColor: "white",
          },
          tabBarActiveTintColor: "black",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={"cafe"} color={color} focused={focused} size={22} />
          ),
        }}
      >
        {() => (
          <Order
            orderHistory={orderHistory}
            setOrderHistory={setOrderHistory}
            userObj={userObj}
            refreshUser={refreshUser}
          />
        )}
      </tabs.Screen>
    </tabs.Navigator>
  );
};
export default TabNav;
