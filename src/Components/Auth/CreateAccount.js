import React from "react";
import { useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { styled } from "styled-components/native";
import { auth } from "../../../firebase";

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
const JoinButton = styled.TouchableOpacity`
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

const Signup = ({ setVal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setVal(true);
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError("There was a problem creating your account");
    }
  };

  return (
    <LoginContainer>
      <Title>Signup</Title>
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
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirm password"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <JoinButton onPress={createAccount}>
        <ButtonText>createAccount</ButtonText>
      </JoinButton>

      <CreateButton onPress={() => setVal(true)}>
        <SmallTitle>Login</SmallTitle>
      </CreateButton>
    </LoginContainer>
  );
};
export default Signup;
