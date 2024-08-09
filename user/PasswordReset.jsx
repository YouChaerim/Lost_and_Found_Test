import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PasswordResetScreen() {
  const navigation = useNavigation();

  // 헤더 숨기기
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleResendPress = () => {
    // 재발송 버튼 클릭 시 실행할 로직
    console.log('재발송 버튼이 클릭되었습니다.');
  };

  const handleVerifyPress = () => {
    Alert.alert('인증 확인', '인증이 확인되었습니다.', [
      { text: '확인', onPress: () => console.log('확인 버튼 클릭됨') },
    ]);
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home', { screen: 'IdFind' })}>
          <Text style={styles.tabText}>아이디 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home', { screen: 'PasswordReset' })}>
          <Text style={styles.tabText}>비밀번호 찾기</Text>
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>

      <View style={styles.Idcontainer}>
        <Text style={styles.title}>비밀번호 재등록</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>아이디를 입력해주세요</Text>
          <TextInput 
            style={styles.input1} 
            placeholder="아이디" 
            placeholderTextColor="#D9D9D9"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>휴대폰 번호를 입력해주세요.</Text>
          <View style={styles.inputGroup2}>
            <TextInput 
              style={styles.input} 
              placeholder="휴대폰 번호" 
              placeholderTextColor="#D9D9D9"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>인증 요청</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.resendText}>
            인증 요청이 오지 않았을 시{' '}
            <TouchableOpacity onPress={handleResendPress}>
              <Text style={styles.resendButton}>재발송</Text>
            </TouchableOpacity>
            을 눌러주세요.
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>인증번호를 입력해주세요.</Text>
          <View style={styles.inputGroup2}>
            <TextInput 
              style={styles.input} 
              placeholder="인증번호" 
              placeholderTextColor="#D9D9D9"
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyPress}>
              <Text style={styles.buttonText}>인증 확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'center',
    width: '100%', // 너비 설정
    height: 852, // 높이 설정
    backgroundColor: '#FFFFFF', // 배경 색상 설정
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    top: 84, // 원하는 위치에 맞게 조정
  },
  tab: {
    width: 162,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
  },
  underline: {
    width: '100%',
    height: 4,
    backgroundColor: '#222222',
    borderRadius: 2,
    position: 'absolute',
    bottom: 0, // 언더라인을 탭 아래에 위치시킴
  },
  Idcontainer: {
    flex: 1,
    padding: 16,
    position: 'center',
    width: '100%', // 너비 설정
    height: '60%', // 높이 설정
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%', // 전체 너비 사용
    maxWidth: 400,
    fontWeight: '10000',
    fontSize: 20, // 글자 크기 조정
    lineHeight: 28,
    color: '#000000',
    marginBottom: 20, // 아래 여백
    marginTop: 250,
  },
  inputGroup: {
    width: '100%', // 너비를 100%로 설정
    marginBottom: 16, // 아래 여백 추가
  },
  inputLabel: {
    width: 208,
    height: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#C9C9C9',
    marginBottom: 8, // 아래 여백 추가
  },
  inputGroup2: {
    flexDirection: 'row',
  },
  input1: {
    boxSizing: 'border-box',
    width: '100%', // 너비를 100%로 설정
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8, // 내부 여백 추가
    marginRight: 10,
  },
  input: {
    boxSizing: 'border-box',
    width: '75%', // 너비를 100%로 설정
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8, // 내부 여백 추가
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
  resendText: {
    fontSize: 12, // 글자 크기 조정
    lineHeight: 16,
    color: '#000000',
    marginTop: 8,
    marginBottom: 16,
  },
  resendButton: {
    textDecorationLine: 'underline',
    color: '#000000', // 버튼 색상
    fontSize: 12,
  },
});
