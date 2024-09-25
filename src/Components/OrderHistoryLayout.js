import { Modal } from "react-native";
import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Popup = styled.View`
  width: 90%;
  background-color: white;
  padding: 20px;
  height: 80%;
  border-radius: 30px;
  align-items: center;
`;
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
const Wrap = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
const OrderHistoryLayout = ({ orderHistory, seeModal, setSeeModal }) => {
  const data = orderHistory;
  const [allPrice, setAllPrice] = useState(0);

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
  return (
    <Modal useNativeDriver={true} transparent={true} visible={seeModal}>
      <Container>
        <Popup>
          <CloseButton onPress={() => setSeeModal(false)}>
            <Ionicons name="close-sharp" size={24} color="black" />
          </CloseButton>
          <Header>
            <Title>주문번호: 1</Title>

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
            data={orderHistory}
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
          </Footer>
        </Popup>
      </Container>
    </Modal>
  );
};
export default OrderHistoryLayout;
