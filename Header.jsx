import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ title, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    width: '100%', // 너비 설정
    height: 100, // 높이 설정
    backgroundColor: '#FFFFFF', // 배경 색상 설정
  },
  backButton: {
    fontSize: 20,
    color: '#000000',
    marginRight: 5, // 버튼과 제목 사이의 간격
  },
  headerText: {
    flex: 1, // 텍스트를 가운데로 정렬하기 위해 flex 사용
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 35,
    textAlign: 'center',
    color: '#000000',
  },
});

export default Header;
