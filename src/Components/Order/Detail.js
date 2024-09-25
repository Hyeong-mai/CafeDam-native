import { styled } from "styled-components/native";

const Detail = styled.View`
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;
const Image = styled.Image`
  width: 90%;
  height: 90%;
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
const DetailLayout = ({ data }) => {
  return (
    <Detail>
      <Image
        resizeMode="contain"
        source={require("../../../assets/menu/item.jpeg")}
      />
      <ItemName>{data.name}</ItemName>
      <ItemPrice>
        {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
      </ItemPrice>
    </Detail>
  );
};
export default DetailLayout;
