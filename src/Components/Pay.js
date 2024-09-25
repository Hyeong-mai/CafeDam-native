import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator } from "react-native";
import { Modal } from "react-native";
import { Text } from "react-native";

const CloseButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  left: 10px;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const PayContainer = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ComplateButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: black;
  border-radius: 15px;
  margin-top: 10px;
`;
const ComplateButtonTItle = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: white;
`;
const Receipt = styled.View`
  border-radius: 10px;
  width: 80%;
  height: 85%;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const Header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #333;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 32px;
`;
const DescriptionView = styled.View`
  width: 100%;
  padding: 20px;
`;
const Description = styled.Text``;
const List = styled.FlatList`
  border-bottom-width: 1px;
  border-bottom-color: #333;
`;
const Footer = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
const Total = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Button = styled.View`
  width: 100%;
  padding: 10px;
`;
const Item = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const Name = styled.Text`
  width: 40%;
  text-align: center;
`;
const Price = styled.Text`
  width: 20%;
  text-align: center;
`;
const Num = styled.Text`
  width: 10%;
  text-align: center;
`;
const TotalPrice = styled.Text`
  width: 30%;
  text-align: center;
`;
const Pay = ({ setOrderHistory, goPay, item, setGoPay, setCart, userObj }) => {
  const data = item;
  const [order, setOrder] = useState(false);
  const [allPrice, setAllPrice] = useState(0);
  const [ment, setMent] = useState(false);

  useEffect(() => {
    setAllPrice(0);
    const calculateTotalPrice = () => {
      let totalPrice = 0;

      data.map((item) => {
        totalPrice += item.price * item.num;
      });

      return totalPrice;
    };
    const totalPrice = calculateTotalPrice();
    console.log(totalPrice);
    setAllPrice(totalPrice);
  }, []);
  const dateToStr = (val) => {
    var localTime = val.toLocaleTimeString();
    var year = val.getFullYear();
    var month = val.getMonth() + 1;
    var day = val.getDate();
    return year + "- " + month + "- " + day;
  };
  const renderItem = ({ item }) => {
    return (
      <Item>
        <Name>{item.name}</Name>
        <Price>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Price>
        <Num>{item.num}</Num>
        <TotalPrice>
          {(item.price * item.num)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </TotalPrice>
      </Item>
    );
  };
  const headerRender = () => {
    return (
      <Item>
        <Name>상품명</Name>
        <Price>단가</Price>
        <Num>수량</Num>
        <TotalPrice>금액</TotalPrice>
      </Item>
    );
  };
  const goOrder = () => {
    if (!ment) {
      setOrder(true);
      setTimeout(function () {
        setOrder(false);
        setMent(true);
      }, 3000);
    } else {
      setOrderHistory(item);
      setGoPay(false);
      setMent(false);
      setCart([]);
    }
  };
  return (
    <Modal useNativeDriver={true} transparent={true} visible={goPay}>
      <PayContainer>
        <Receipt>
          <CloseButton onPress={() => setGoPay(false)}>
            <Ionicons name="close-sharp" size={24} color="black" />
          </CloseButton>
          <Header>
            <Title>CafeDam</Title>
            <DescriptionView>
              <Description>
                <Ionicons name="calendar-outline" size={18} color="black" />
                {dateToStr(new Date())}
              </Description>
              <Description>
                <Ionicons name="person-outline" size={18} color="black" />
                박혜준
              </Description>
              <Description>
                <Ionicons name="location-outline" size={18} color="black" />
                경기도 성남시 분당구 정자동 불정로 7
              </Description>
              <Description>
                <Ionicons name="call-outline" size={18} color="black" />
                0507-1414-6367
              </Description>
            </DescriptionView>
          </Header>
          <List
            ListHeaderComponent={headerRender}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Footer>
            <Total>
              <Title>Total</Title>
              <Description>
                {allPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </Description>
            </Total>
            {ment ? (
              <Description style={{ marginTop: 10, fontWeight: "bold" }}>
                주문이 성곡적으로 요청되었습니다.
              </Description>
            ) : null}
          </Footer>
          <Button>
            <ComplateButton onPress={goOrder}>
              {order ? (
                <ActivityIndicator
                  style={{ marginBottom: 10 }}
                  color={"white"}
                  size={"small"}
                />
              ) : null}
              <ComplateButtonTItle>
                {order ? "결제요청중" : ment ? "닫기" : "주문하기"}
              </ComplateButtonTItle>
            </ComplateButton>
          </Button>
        </Receipt>
      </PayContainer>
    </Modal>
  );
};
export default Pay;
