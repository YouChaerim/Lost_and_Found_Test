import React, { useState } from 'react';
import { Alert, View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const handleSignUp = (user_id, user_phone_number, user_password, user_password2, user_name, user_profile_image, user_address, user_nickname) => {
  axios.post('http://20.30.17.16/auth/register', {
    user_id,
    user_phone_number,
    user_password,
    user_password2,
    user_name,
    user_profile_image,
    user_address,
    user_nickname
  })
  .then(response => {
    if (response.data.success) {
      Alert.alert('Success', 'Registration successful');
    } else {
      Alert.alert('Error', response.data.message);
    }
  })
  .catch(error => {
    Alert.alert('Error', 'An error occurred');
  });
};

const SignUp = () => {
  const [user_id, setUserId] = useState('');
  const [user_phone_number, setUserPhoneNumber] = useState('');
  const [user_password, setUserPassword] = useState('');
  const [user_password2, setUserPassword2] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_profile_image, setUserProfileImage] = useState('');
  const [user_address, setUserAddress] = useState('');
  const [user_nickname, setUserNickname] = useState('');

  return (
    <View style={styles.container}>
      <TextInput placeholder="User ID" value={user_id} onChangeText={setUserId} style={styles.input} />
      <TextInput placeholder="Phone Number" value={user_phone_number} onChangeText={setUserPhoneNumber} style={styles.input} />
      <TextInput placeholder="Password" value={user_password} onChangeText={setUserPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirm Password" value={user_password2} onChangeText={setUserPassword2} secureTextEntry style={styles.input} />
      <TextInput placeholder="Name" value={user_name} onChangeText={setUserName} style={styles.input} />
      <TextInput placeholder="Profile Image URL" value={user_profile_image} onChangeText={setUserProfileImage} style={styles.input} />
      <TextInput placeholder="Address" value={user_address} onChangeText={setUserAddress} style={styles.input} />
      <TextInput placeholder="Nickname" value={user_nickname} onChangeText={setUserNickname} style={styles.input} />
      <Button title="Sign Up" onPress={() => handleSignUp(user_id, user_phone_number, user_password, user_password2, user_name, user_profile_image, user_address, user_nickname)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default SignUp;
signup. js파일