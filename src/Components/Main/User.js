import React from "react";
import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserContainer = styled.View`
  width: 60%;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
`;
const Column = styled.View`
  flex-direction: column;
`;
const Row = styled.View`
  padding: 7px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
`;
const Username = styled.Text`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
const Stemp = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;
const StempTxt = styled.Text``;
const Coupon = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const OpenModal = styled.TouchableOpacity``;
const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 900;
  color: black;
`;
const User = ({ setAuthModalView, userObj }) => {
  return (
    <UserContainer>
      <Column>
        {userObj ? (
          <Username>{userObj.email}</Username>
        ) : (
          <OpenModal onPress={() => setAuthModalView(true)}>
            <ButtonText>
              로그인 하러 가기
              <Ionicons
                style={{ marginLeft: 10 }}
                name="arrow-forward"
                size={24}
                color="black"
              />
            </ButtonText>
          </OpenModal>
        )}
        {userObj ? (
          <Row>
            <Stemp>
              <Ionicons name="cafe-outline" size={24} color={"black"} />
              <StempTxt> 스탬프 0</StempTxt>
            </Stemp>
            <Coupon>
              <Ionicons name="wallet-outline" size={24} color={"black"} />
              <StempTxt> 쿠폰 0 </StempTxt>
            </Coupon>
          </Row>
        ) : null}
      </Column>
    </UserContainer>
  );
};
export default User;
