//약관동의 백엔드에 보내는 거 나중에 꼭 생각해야함


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpAgree() {
  const navigation = useNavigation();
  
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([false, false, false, false]);

  const toggleCheckbox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    const newCheckboxStates = newCheckedState ? [true, true, true, true] : [false, false, false, false];
    setCheckboxStates(newCheckboxStates);
  };

  const toggleIndividualCheckbox = (index) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
    
    // 첫 번째 체크박스 클릭 시 전체 체크박스 상태를 변경하지 않도록 수정
    if (index === 0) {
        return; // 첫 번째 체크박스를 클릭하면 아무 것도 하지 않음
    }

    // 전체 동의 체크박스 상태 업데이트
    if (newStates.every(state => state)) {
        setIsChecked(true);
    } else {
        setIsChecked(false);
    }
  };

  const handleNext = () => {
    // 필수 체크박스가 선택되지 않았을 경우 경고 메시지 표시
    const requiredChecked = checkboxStates[0] && checkboxStates[1] && checkboxStates[2]; // 필수 체크박스 두 개 체크 확인

    if (!requiredChecked) {
      Alert.alert("필수 체크박스를 모두 선택해 주세요.");
    } else {
      navigation.navigate('SignUp1');
    }
  };

  useEffect(() => {
    // 전체 동의 체크박스 상태가 변경되면 개별 체크박스 상태를 업데이트
    if (isChecked) {
      setCheckboxStates([true, true, true, true]); // 선택된 체크박스의 상태 유지
    } else {
      setCheckboxStates([false, false, false, false]); // 선택 해제
    }
  }, [isChecked]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>서비스 이용을 위한 동의 안내</Text>
      <Text style={styles.subtitle}>
        서비스 이용에 꼭 필요한 사항입니다. 정책 및 약관을 클릭해 모든 내용을 꼭 확인해 주세요.
      </Text>

      <View style={styles.agreementContainer}>
        <Text style={styles.agreementText}>전체 동의</Text>
        <TouchableOpacity style={[styles.checkbox, isChecked && styles.checked]} onPress={toggleCheckbox} />
      </View>

      <View style={styles.line28} />

      <View style={styles.group69}>
        {['[필수] 개인정보 처리 방침', '[필수] “앱 이름” 서비스 이용약관', '[필수] 위치기반 서비스 이용약관', '[선택] 앱 푸시 알림 수신'].map((text, index) => (
          <View style={styles.checkboxContainer} key={index}>
            <Text style={styles.policyText}>{text}</Text>
            <TouchableOpacity 
              style={[styles.checkbox, checkboxStates[index] && styles.checked]} 
              onPress={() => toggleIndividualCheckbox(index)} 
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
  title: {
    width: '100%',
    maxWidth: 400,
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 36,
    color: '#000000',
    marginBottom: 16,
    marginTop: 150,
  },
  subtitle: {
    width: '80%',
    maxWidth: 400,
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    marginBottom: 100,
    marginTop: 8,
  },
  agreementContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  agreementText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
    marginLeft: 10,
  },
  line28: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: 359,
    height: 0,
    borderWidth: 0.6,
    borderColor: '#BEBEBE',
  },
  group69: {
    marginTop: 20,
    width: '90%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 10,
  },
  checkbox: {
    width: 26,
    height: 26,
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 13,
    marginLeft: 10,
  },
  checked: {
    backgroundColor: '#7F7FFF',
  },
  policyText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
    marginRight: 10,
  },
  nextButton: {
    position: 'absolute',
    width: 361,
    height: 48,
    left: 16,
    top: 724,
    backgroundColor: '#7F7FFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 35,
    color: '#FFFFFF',
  },
});
