import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, TouchableOpacity } from "react-native";
import Signup from "./CreateAccount";
import Login from "./Login";
import { styled } from "styled-components/native";
import { useState } from "react";

const AuthWrap = styled.View`
  width: 100%;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`;
const Popup = styled.View`
  width: 80%;
  height: 50%;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
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

const AuthModal = ({ authModalView, setAuthModalView, refreshUser }) => {
  const [val, setVal] = useState(true);
  return (
    <Modal useNativeDriver={true} transparent={true} visible={authModalView}>
      <AuthWrap>
        <Popup>
          <CloseButton onPress={() => setAuthModalView(false)}>
            <Ionicons name="close-sharp" size={24} color="black" />
          </CloseButton>
          {val ? (
            <Login
              setAuthModalView={setAuthModalView}
              refreshUser={refreshUser}
              setVal={setVal}
            />
          ) : (
            <Signup setVal={setVal} />
          )}
        </Popup>
      </AuthWrap>
    </Modal>
  );
};
export default AuthModal;
