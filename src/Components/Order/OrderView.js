import { useState } from "react";
import { Text } from "react-native";

import { RadioButton } from "react-native-paper";
import { styled } from "styled-components/native";

const OrderContainer = styled.View`
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
`;
const DetailWrap = styled.View`
  width: 100%;
  flex-direction: row;
  height: 40%;
  align-items: center;
  justify-content: center;
`;
const CountWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
`;
const ButtonWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  margin-bottom: 20px;
`;
const ItemName = styled.Text`
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 10px;
`;
const ItemPrice = styled.Text`
  font-weight: 900;
  font-size: 18px;
`;
const Image = styled.Image`
  width: 50%;
  height: 100%;
`;
const Col = styled.View`
  width: 50%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Ice = styled.TouchableOpacity`
  width: 30%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${(props) => (props.value ? "black" : "white")};
`;
const Hot = styled.TouchableOpacity`
  width: 30%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${(props) => (props.value ? "white" : "black")};
`;
const IceText = styled.Text`
  color: ${(props) => (props.value ? "white" : "black")};
`;
const HotText = styled.Text`
  color: ${(props) => (props.value ? "black" : "white")};
`;
const Button = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 200px;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
`;
const Num = styled.Text`
  margin-left: 20px;
  margin-right: 20px;
  font-weight: bold;
  font-size: 20px;
`;
const ButtonTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const TotalWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  margin-bottom: 20px;
`;
const Total = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const OrderView = ({ data, ice, setIce, num, setNum }) => {
  const count = (data) => {
    if (data) {
      setNum(num + 1);
    } else {
      if (num >= 1) {
        setNum(num - 1);
      }
    }
  };
  return (
    <OrderContainer>
      <DetailWrap>
        <Image
          resizeMode="contain"
          source={require("../../../assets/menu/item.jpeg")}
        />
        <Col>
          <ItemName>{data.name}</ItemName>
          <ItemPrice>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </ItemPrice>
        </Col>
      </DetailWrap>
      <ButtonWrap>
        <Ice value={ice} onPress={() => setIce(!ice)}>
          <IceText value={ice}>ice</IceText>
        </Ice>
        <Hot value={ice} onPress={() => setIce(!ice)}>
          <HotText value={ice}>hot</HotText>
        </Hot>
      </ButtonWrap>
      <CountWrap>
        <Button onPress={() => count(false)}>
          <ButtonTitle>-</ButtonTitle>
        </Button>
        <Num>{num}</Num>
        <Button onPress={() => count(true)}>
          <ButtonTitle>+</ButtonTitle>
        </Button>
      </CountWrap>
      <TotalWrap>
        <Total>
          총 :
          {(data.price * num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </Total>
      </TotalWrap>
    </OrderContainer>
  );
};
export default OrderView;
