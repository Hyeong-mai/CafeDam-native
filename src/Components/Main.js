import React, { useState } from "react";
import { styled } from "styled-components/native";
import ScreenLayout from "./Layout/ScreenLauout";
import User from "./Main/User";
import Banner from "./Main/Banner";
import Menu from "./Main/Menu";
import News from "./Main/News";
import { Image } from "react-native";
import AuthModal from "./Auth/AuthModal";

import OrderHistory from "./OrderHistory";

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
const HeaderImageSlide = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: black;
`;
const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
const MainContents = styled.View`
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.Image`
  width: 30%;
  height: 80px;
`;
const Cover = styled.View`
  width: 150%;
  height: 150%;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
const Slogan = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  font-size: 16px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const Main = ({ orderHistory, refreshUser, userObj }) => {
  const [authModalView, setAuthModalView] = useState(false);
  return (
    <ScreenLayout loading={false}>
      <AuthModal
        refreshUser={refreshUser}
        authModalView={authModalView}
        setAuthModalView={setAuthModalView}
      />
      <MainContainer>
        <ScrollView>
          <HeaderImageSlide>
            <Cover>
              <Slogan>A cup of cafedam for daily routine</Slogan>
            </Cover>
            <Image
              style={{ width: "200%", height: "200%" }}
              resizeMode="contain"
              source={require("../../assets/background_white.jpg")}
            />
          </HeaderImageSlide>
          <MainContents>
            <Row>
              <Logo
                resizeMode="contain"
                source={require("../../assets/cafedamLogo.png")}
              />
              <User setAuthModalView={setAuthModalView} userObj={userObj} />
            </Row>
            <Banner />
            <Menu />
            <News />
          </MainContents>
        </ScrollView>

        {orderHistory.length > 0 ? (
          <OrderHistory orderHistory={orderHistory} />
        ) : null}
      </MainContainer>
    </ScreenLayout>
  );
};

export default Main;
