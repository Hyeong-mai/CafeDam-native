import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { styled } from "styled-components/native";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const MenuContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;
const Title = styled.View`
  width: 100%;
  padding: 10px;
`;
const TItleText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
const FlatList = styled.FlatList`
  width: 100%;
  background-color: white;
  padding: 10px;
`;
const Item = styled.View`
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;
const MenuTitle = styled.Text`
  margin-top: 10px;
  font-weight: bold;
`;

const Menu = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Firestore에서 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "item"));
        const documents = querySnapshot.docs.map((doc) => doc.data());
        setData(documents);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Item>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../../assets/menu/item.jpeg")}
        />
        <MenuTitle>{item.name}</MenuTitle>
      </Item>
    );
  };
  return (
    <MenuContainer>
      <Title>
        <TItleText>손님 을 위한 추천 메뉴</TItleText>
      </Title>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </MenuContainer>
  );
};
export default Menu;
