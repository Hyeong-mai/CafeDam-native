import React from "react";
import { useState } from "react";

import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { styled } from "styled-components/native";

const LoginContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
`;
const CreateButton = styled.TouchableOpacity`
  padding: 10px;
`;
const SmallTitle = styled.Text`
  color: green;
  font-weight: bold;
`;
const TextInput = styled.TextInput`
  width: 90%;
  padding: 10px 20px;
  border: 1px solid #333;
  border-radius: 20px;
  margin-bottom: 10px;
`;
const LoginButton = styled.TouchableOpacity`
  width: 90%;
  padding: 10px;
  background-color: black;
  border-radius: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
const Login = ({ setVal, refreshUser, setAuthModalView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      refreshUser();
      setAuthModalView(false);
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Your email or password was incorrect");
      } else if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError("There was a problem with your request");
      }
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>

      {error && <SmallTitle>{error}</SmallTitle>}

      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter email address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <LoginButton onPress={loginUser} disabled={!email || !password}>
        <ButtonText>Log in</ButtonText>
      </LoginButton>

      <CreateButton onPress={() => setVal(false)}>
        <SmallTitle>Create an account</SmallTitle>
      </CreateButton>
    </LoginContainer>
  );
};
export default Login;
