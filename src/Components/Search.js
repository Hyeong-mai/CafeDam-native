import React from "react";
import { styled } from "styled-components/native";
import ScreenLayout from "./Layout/ScreenLauout";
import { TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchContainer = styled.View`
  flex: 1;
`;
const SearchInput = styled.View`
  width: 100%;
  padding: 20px;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
`;
const FlatList = styled.FlatList`
  flex: 1;
  width: 100%;
  padding: 20px;
`;
const Input = styled.TextInput`
  width: 90%;
  font-size: 18px;
`;

const Search = () => {
  return (
    <ScreenLayout loading={false}>
      <SearchContainer>
        <SearchInput>
          <Ionicons name="search-outline" color={"black"} size={20} />
          <Input placeholder="상품명으로 검색" />
        </SearchInput>
        <FlatList />
      </SearchContainer>
    </ScreenLayout>
  );
};

export default Search;
