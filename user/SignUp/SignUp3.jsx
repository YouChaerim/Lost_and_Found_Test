import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../Header';
import Postcode from '@actbase/react-daum-postcode';

export default function SignUp3() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params; // SignUp2에서 전달된 데이터
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [isPostcodeVisible, setPostcodeVisible] = useState(false);

  const handleAddressSelect = (data) => {
    setAddress(data.address);
    setPostcodeVisible(false);
  };

  const handleRegister = async () => {
    const finalUserData = {
      ...userData,
      user_address: address,
      user_detailed_address: detailedAddress,
    };
console.log("signup3", finalUserData);
    try {
      const response = await axios.post('http://192.168.0.116:3000/auth/register', finalUserData);
      if (response.data.success) {
        Alert.alert('회원가입 성공');
        navigation.navigate('Login');
      } else {
        Alert.alert('회원가입 실패', response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'signup error');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="회원가입" navigation={navigation} />

      <Text style={styles.title}>주소를 입력해주세요</Text>

      <Text style={styles.subtitle}>
        등록한 주소 근처의 물건을 찾아주거나 찾아볼 수 있어요
      </Text>

      <View style={styles.inputGroup}>
        <View style={styles.inputGroup2}>
          <TextInput
            style={styles.input}
            placeholder="주소를 입력하세요"
            value={address}
            onChangeText={setAddress}
            editable={false}
          />
          <TouchableOpacity style={styles.button} onPress={() => setPostcodeVisible(true)}>
            <Text style={styles.buttonText}>주소 검색</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>상세주소를 입력해주세요</Text>
        <TextInput
          style={styles.input1}
          placeholder="상세주소를 입력하세요"
          value={detailedAddress}
          onChangeText={setDetailedAddress}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
        <Text style={styles.nextButtonText}>회원가입</Text>
      </TouchableOpacity>

      {isPostcodeVisible && (
        <View style={styles.postcodeContainer}>
          <Postcode
            style={{ width: '100%', height: '100%' }}
            jsOptions={{ animation: true }}
            onSelected={handleAddressSelect}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    color: '#000000',
    marginBottom: 16,
    marginTop: 30,
  },
  subtitle: {
    fontWeight: '300',
    fontSize: 14,
    color: '#000000',
    marginBottom: 30,
    marginTop: 8,
  },
  inputGroup: {
    marginTop: 20,
    marginBottom: 16,
  },
  inputGroup2: {
    flexDirection: 'row',
  },
  input: {
    width: '75%',
    height: 48,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  input1: {
    width: '100%',
    height: 48,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
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
    fontWeight: '400',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  nextButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#7F7FFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 290,
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  postcodeContainer: {
    position: 'absolute',
    marginTop: 100,
    width: '110%',
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1,
  },
});
