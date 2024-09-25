import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import TabNav from "./src/Navigater/TabNav";
import { auth } from "./firebase";

const OnlayoutView = styled.View`
  flex: 1;
`;
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUserObj({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
    });
  };
  useEffect(() => {
    async function preLoadAsset() {
      try {
        const FontsToLoad = [Ionicons.font];
        const FontsPromise = FontsToLoad.map((font) => {
          Font.loadAsync(font);
        });
        // const ImagesToLoad = [require("./assets/logo.png")];
        // const ImagePromise = ImagesToLoad.map((image) => {
        //   Asset.loadAsync(image);
        // });
        // return Promise.all([...FontsPromise, ...ImagePromise]);
        return Promise.all([...FontsPromise]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    preLoadAsset();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer>
      <OnlayoutView onLayout={onLayoutRootView}>
        <TabNav userObj={userObj} refreshUser={refreshUser} />
      </OnlayoutView>
    </NavigationContainer>
  );
}
