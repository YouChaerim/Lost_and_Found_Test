import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../Header';

export default function SignUp1() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const checkDuplicateUserId = async () => {
    try {
      const response = await axios.get('http://192.168.0.116:3000/auth/check_duplicate', {
        params: {
          user_id: userId
        }
      });
      if (response.data.exists) {
        Alert.alert('중복된 아이디입니다.');
        setIsUserIdValid(false);
      } else {
        Alert.alert('사용 가능한 아이디입니다.');
        setIsUserIdValid(true);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while checking user ID.');
    }
  };

  const checkDuplicatePhoneNumber = async () => {
    try {
      const response = await axios.get('http://192.168.0.116:3000/auth/check_duplicate', {
        params: {
          user_phone_number: phoneNumber
        }
      });
      if (response.data.exists) {
        Alert.alert('중복된 전화번호입니다.');
        setIsPhoneNumberValid(false);
      } else {
        Alert.alert('사용 가능한 전화번호입니다.');
        setIsPhoneNumberValid(true);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while checking phone number.');
    }
  };

  const handleNext = async () => {
    console.log('다음 버튼 클릭');

    if (password !== confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const userData = {
      user_id: userId,
      user_phone_number: phoneNumber,
      user_password: password,
      user_password2: confirmPassword,
      // user_name: "test name", // 초기 값 설정
      // user_profile_image: "test.jpg", // 초기 값 설정
      // user_address: "test address", // 초기 값 설정
      // user_nickname: "test nickname" // 초기 값 설정
    };

  //   try {
  //     const response = await axios.post('http://192.168.0.116:3000/auth/register', userData);
  //     if (response.data.success) {
  //       Alert.alert('회원가입 성공');
  //       navigation.navigate('SignUp2', { userData }); // userData를 함께 전달
  //     } else {
  //       Alert.alert('회원가입 실패', response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Error', 'An error occurred while signing up.');
  //   }
  // };

  navigation.navigate('SignUp2', { userData });
  console.log(userData);
  };

  return (
    <View style={styles.container}>
      <Header title="회원가입" navigation={navigation} />

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>휴대폰 번호를 입력해주세요.</Text>
        <View style={styles.inputGroup2}>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={checkDuplicatePhoneNumber}>
            <Text style={styles.buttonText}>중복인증</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>아이디를 입력해주세요.</Text>
        <View style={styles.inputGroup2}>
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
          />
          <TouchableOpacity style={styles.button} onPress={checkDuplicateUserId}>
            <Text style={styles.buttonText}>중복인증</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>비밀번호를 입력해주세요</Text>
        <TextInput
          style={styles.input1}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>비밀번호를 재입력해주세요</Text>
        <TextInput
          style={styles.input1}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext} 
        disabled={!isUserIdValid || !isPhoneNumberValid}
      >
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    width: '100%',
    height: 852,
    backgroundColor: '#FFFFFF',
  },
  inputGroup: {
    width: '100%',
    marginTop: 20,
    marginBottom: 16,
  },
  inputLabel: {
    width: 208,
    height: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#C9C9C9',
    marginBottom: 8,
  },
  inputGroup2: {
    flexDirection: 'row',
  },
  input1: {
    boxSizing: 'border-box',
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  input: {
    boxSizing: 'border-box',
    width: '75%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  button: {
    width: 82,
    height: 48,
    backgroundColor: '#7F7FFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  nextButton: {
    width: '100%',
    maxWidth: 359,
    height: 48,
    backgroundColor: '#7F7FFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 170,
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 35,
    color: '#FFFFFF',
  },
});
