import React from "react";
import { Text } from "react-native";
import { styled } from "styled-components/native";

const NewsContainer = styled.View`
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
  padding: 10px 20px;
`;
const Item = styled.View`
  width: 280px;
  height: 180px;
  margin-right: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  border-radius: 10px;
  justify-content: center;
`;

const data = [
  {
    id: 1,
    file: "",
  },
  {
    id: 2,
    file: "",
  },
  {
    id: 3,
    file: "",
  },
  {
    id: 4,
    file: "",
  },
];

const News = () => {
  const renderItem = ({ item }) => {
    return (
      <Item>
        <TItleText>{item.id}</TItleText>
      </Item>
    );
  };
  return (
    <NewsContainer>
      <Title>
        <TItleText>새소식</TItleText>
      </Title>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </NewsContainer>
  );
};
export default News;
