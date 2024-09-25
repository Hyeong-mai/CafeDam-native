import { useState } from "react";
import { Modal, Text } from "react-native";
import { styled } from "styled-components/native";
import DetailLayout from "./Detail";
import OrderView from "./OrderView";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const ModalWrap = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Popup = styled.View`
  width: 90%;
  background-color: white;
  padding: 20px;
  height: 70%;
  border-radius: 30px;
  align-items: center;
`;

const Complate = styled.View`
  width: 100%;
  height: 20%;
`;
const ComplateButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: black;
  border-radius: 15px;
  margin-top: 10px;
`;
const ComplateButtonTItle = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: white;
`;
const ErrorText = styled.Text`
  font-weight: 800;
  color: red;
`;
const ModalLayout = ({
  userObj,
  cart,
  setExpress,
  setCart,
  data,
  modalVisible,
  setOpenModal,
}) => {
  const navigation = useNavigation();
  const [orderVal, setOrderVal] = useState(false);
  const [ice, setIce] = useState(true);
  const [num, setNum] = useState(0);
  const [error, setError] = useState("");
  const gogo = () => {
    if (userObj) {
      setOrderVal(true);
    } else {
      setError("로그인을 해주세요.");
    }
  };
  const goCart = (val) => {
    if (num > 0) {
      setOpenModal(false);
      const newItem = {
        name: `${data.name}${ice ? "(ice)" : "(hot)"}`,
        price: data?.price,
        num: num,
        id: data.id + new Date(),
      };
      setCart([newItem, ...cart]);
      setOrderVal(false);
      setError("");
      if (val) {
        setExpress(true);
      }
    } else {
      setError("수량을 선택해 주세요.");
    }
  };
  return (
    <Modal useNativeDriver={true} transparent={true} visible={modalVisible}>
      <ModalWrap>
        <Popup>
          {orderVal ? (
            <OrderView
              ice={ice}
              setIce={setIce}
              num={num}
              setNum={setNum}
              data={data}
            />
          ) : (
            <DetailLayout data={data} />
          )}
          <ErrorText>{error}</ErrorText>
          <Complate>
            {orderVal ? (
              <ComplateButton onPress={() => goCart(true)}>
                <ComplateButtonTItle>바로 주문</ComplateButtonTItle>
              </ComplateButton>
            ) : (
              <ComplateButton onPress={() => gogo()}>
                <ComplateButtonTItle>주문하기</ComplateButtonTItle>
              </ComplateButton>
            )}
            {orderVal ? (
              <ComplateButton onPress={() => goCart()}>
                <ComplateButtonTItle>장바구니 담기</ComplateButtonTItle>
              </ComplateButton>
            ) : (
              <ComplateButton
                onPress={() => {
                  setError(""), setOpenModal(false);
                }}
              >
                <ComplateButtonTItle>취소</ComplateButtonTItle>
              </ComplateButton>
            )}
          </Complate>
        </Popup>
      </ModalWrap>
    </Modal>
  );
};

export default ModalLayout;
