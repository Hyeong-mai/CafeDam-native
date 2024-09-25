import { Modal } from "react-native";
import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Container = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const OrderHistoryIcon = ({ setSeeModal }) => {
  return (
    <Container onPress={() => setSeeModal(true)}>
      <Ionicons name="clipboard-outline" size={30} color="white" />
    </Container>
  );
};
export default OrderHistoryIcon;
