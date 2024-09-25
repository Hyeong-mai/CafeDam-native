import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import ScreenLayout from "./Layout/ScreenLauout";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ModalLayout from "./Order/ModalLayout";
import Pay from "./Pay";
import OrderHistory from "./OrderHistory";
import { Asset } from "expo-asset";

const OrderContainer = styled.View`
  flex: 1;
`;
const MenuCategory = styled.View`
  padding: 20px;
  width: 100%;
  flex-direction: row;
  background-color: white;
`;

const Button = styled.TouchableOpacity`
  padding: 7px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  margin-right: 7px;
`;
const ButtonTitle = styled.Text`
  font-weight: 400;
  font-size: 14px;
`;
const Header = styled.View``;
const Count = styled.Text`
  font-size: 16px;
`;
const FlatList = styled.FlatList`
  width: 100%;
  background-color: white;
  padding: 10px;
`;
const Item = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const MenuTitle = styled.Text`
  margin-top: 10px;
  font-weight: bold;
`;
const HeaderRightText = styled.Text``;
const CartView = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: black;
  bottom: 20px;
  right: 20px;
`;
const NumView = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  top: 0px;
  right: 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const Num = styled.Text`
  font-weight: bold;
  color: black;
`;
const Order = ({ orderHistory, setOrderHistory, navigation, userObj }) => {
  const { width } = useWindowDimensions();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [cart, setCart] = useState([]);
  const [express, setExpress] = useState(false);
  const [goPay, setGoPay] = useState(false);
  useEffect(() => {
    if (express) {
      setGoPay(true);
      setExpress(false);
    }
  }, [express]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category !== 0) {
          const q = query(
            collection(db, "item"),
            where("category", "==", category)
          );
          const querySnapshot = await getDocs(q);
          const documents = querySnapshot.docs.map((doc) => doc.data());
          setData(documents);
        } else {
          const q = query(collection(db, "item"));
          const querySnapshot = await getDocs(q);
          const documents = querySnapshot.docs.map((doc) => doc.data());
          setData(documents);
        }
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [category]);
  const renderItem = ({ item }) => {
    // /Users/phillip/Documents/CafeDam-native/assets/menu/menu1.png
    // assets/menu/menu3.png
    return (
      <Item
        onPress={() => {
          setSelectItem(item), setOpenModal(true);
        }}
      >
        <Image
          style={{ width: width / 3, height: 100 }}
          source={require("../../assets/menu/item.jpeg")}
        />
        <MenuTitle>{item.name}</MenuTitle>
        <MenuTitle>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </MenuTitle>
      </Item>
    );
  };
  const HeaderItem = () => {
    return (
      <Header>
        <Count>{data.length}개</Count>
      </Header>
    );
  };
  return (
    <ScreenLayout loading={false}>
      <OrderContainer>
        <MenuCategory>
          <Button onPress={() => setCategory(0)}>
            <ButtonTitle>전체 메뉴</ButtonTitle>
          </Button>
          <Button onPress={() => setCategory(1)}>
            <ButtonTitle>커피 메뉴</ButtonTitle>
          </Button>
          <Button onPress={() => setCategory(2)}>
            <ButtonTitle>논-커피 메뉴</ButtonTitle>
          </Button>
          <Button onPress={() => setCategory(3)}>
            <ButtonTitle>티 메뉴</ButtonTitle>
          </Button>
          <Button onPress={() => setCategory(4)}>
            <ButtonTitle>디저트</ButtonTitle>
          </Button>
        </MenuCategory>
        <FlatList
          ListHeaderComponent={HeaderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </OrderContainer>
      {cart.length > 0 ? (
        <CartView onPress={() => setGoPay(true)}>
          <NumView>
            <Num>{cart.length}</Num>
          </NumView>
          <Text>
            <Ionicons name="cart-outline" size={30} color="white" />
          </Text>
        </CartView>
      ) : null}
      <Pay
        setOrderHistory={setOrderHistory}
        userObj={userObj}
        setGoPay={setGoPay}
        goPay={goPay}
        item={cart}
        setCart={setCart}
      />
      <ModalLayout
        userObj={userObj}
        setExpress={setExpress}
        cart={cart}
        setCart={setCart}
        data={selectItem}
        modalVisible={openModal}
        setOpenModal={setOpenModal}
      />
      {orderHistory.length > 0 ? (
        <OrderHistory orderHistory={orderHistory} />
      ) : null}
    </ScreenLayout>
  );
};

export default Order;
