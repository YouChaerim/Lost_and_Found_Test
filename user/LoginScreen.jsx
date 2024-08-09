import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { setToken } from './Management/TokenManagement';
import { setUser } from './Management/UserManagement';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.116:3000/auth/login_process', {
        user_id: username,
        user_password: password,
      });

      if (response.data.success) {
        Alert.alert('로그인 성공!', `환영합니다, ${username}!`);
        await setToken(response.data.token); // 토큰 저장
        await setUser({ username }); // 유저 정보 저장
        navigation.navigate('SignIn'); // 로그인 성공 시 메인 페이지로 이동
        setShowError(false); // 로그인 성공 시 에러 메시지 숨김
      } else {
        setShowError(true); // 로그인 실패 시 에러 메시지 표시
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.lostItemExpert}>잃어버린 물건 찾기 전문가</Text>
      <Text style={styles.quickFindText}>
        분실된 물건을 신속하게 찾고 돌려받으세요. 습득한 물건을 찾아주고 사례금을 받아보세요.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력해주세요."
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해주세요"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {showError && (
        <Text style={styles.checkCredentialsText}>
          아이디 또는 비밀번호를 다시 확인하세요.
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.line28} />
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('IdFind')}>
          <Text style={styles.textId}>아이디 찾기</Text>
        </TouchableOpacity>
        <View style={styles.line30} />
        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={styles.textPassword}>비밀번호 재등록</Text>
        </TouchableOpacity>
        <View style={styles.line31} />
        <TouchableOpacity onPress={() => navigation.navigate('SignUpAgree')}>
          <Text style={styles.textSignup}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  lostItemExpert: {
    width: '100%',
    maxWidth: 400,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: '#000000',
    marginBottom: 20,
    marginTop: 150,
  },
  quickFindText: {
    width: '100%',
    maxWidth: 400,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 23,
  },
  input: {
    width: '90%',
    maxWidth: 327,
    height: 48,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  checkCredentialsText: {
    width: '100%',
    maxWidth: 400,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    color: '#FF0000',
    marginBottom: 16,
    marginLeft: 16,
  },
  button: {
    width: '100%',
    maxWidth: 359,
    height: 48,
    backgroundColor: '#7F7FFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  line28: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: 359,
    height: 0,
    borderWidth: 0.6,
    borderColor: '#BEBEBE',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  line30: {
    width: 1,
    height: 20,
    backgroundColor: '#BEBEBE',
    marginHorizontal: 20,
  },
  line31: {
    width: 1,
    height: 20,
    backgroundColor: '#BEBEBE',
    marginHorizontal: 20,
  },
  textId: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#8E8E8E',
  },
  textPassword: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#8E8E8E',
  },
  textSignup: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#8E8E8E',
  },
});











// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import mockData from '../mockData';

// export default function LoginScreen() {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showError, setShowError] = useState(false);

//   const handleLogin = () => {
//     const user = mockData.users.find(user => user.username === username && user.password === password);
//     if (user) {
//       Alert.alert('로그인 성공!', `환영합니다, ${user.name}!`);
//       navigation.navigate('Main'); // 로그인 성공 시 메인 페이지로 이동
//       setShowError(false); // 로그인 성공 시 에러 메시지 숨김
//     } else {
//       setShowError(true); // 로그인 실패 시 에러 메시지 표시
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.lostItemExpert}>잃어버린 물건 찾기 전문가</Text>
//       <Text style={styles.quickFindText}>
//         분실된 물건을 신속하게 찾고 돌려받으세요. 습득한 물건을 찾아주고 사례금을 받아보세요.
//       </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="아이디를 입력해주세요."
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="비밀번호를 입력해주세요"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       {showError && ( // 에러 메시지 조건부 렌더링
//         <Text style={styles.checkCredentialsText}>
//           아이디 또는 비밀번호를 다시 확인하세요.
//         </Text>
//       )}
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>로그인</Text>
//       </TouchableOpacity>

//       <View style={styles.line28} />
//       <View style={styles.textContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('IdFind')}>
//           <Text style={styles.textId}>아이디 찾기</Text>
//         </TouchableOpacity>
//         <View style={styles.line30} />
//         <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
//           <Text style={styles.textPassword}>비밀번호 재등록</Text>
//         </TouchableOpacity>
//         <View style={styles.line31} />
//         <TouchableOpacity onPress={() => navigation.navigate('SignUpAgree')}>
//           <Text style={styles.textSignup}>회원가입</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#FFFFFF',
//   },
//   lostItemExpert: {
//     width: '100%',
//     maxWidth: 400,
//     fontWeight: '700',
//     fontSize: 20,
//     lineHeight: 28,
//     color: '#000000',
//     marginBottom: 20,
//     marginTop: 150,
//   },
//   quickFindText: {
//     width: '100%',
//     maxWidth: 400,
//     fontWeight: '400',
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#000000',
//     marginBottom: 23,
//   },
//   input: {
//     width: '90%',
//     maxWidth: 327,
//     height: 48,
//     borderColor: '#000000',
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 8,
//     fontSize: 16,
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   checkCredentialsText: {
//     width: '100%',
//     maxWidth: 400,
//     fontWeight: '400',
//     fontSize: 10,
//     lineHeight: 16,
//     color: '#FF0000',
//     marginBottom: 16,
//     marginLeft: 16,
//   },
//   button: {
//     width: '100%',
//     maxWidth: 359,
//     height: 48,
//     backgroundColor: '#7F7FFF',
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: 16,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   line28: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//     width: 359,
//     height: 0,
//     borderWidth: 0.6,
//     borderColor: '#BEBEBE',
//   },
//   textContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   line30: {
//     width: 1,
//     height: 20,
//     backgroundColor: '#BEBEBE',
//     marginHorizontal: 20,
//   },
//   line31: {
//     width: 1,
//     height: 20,
//     backgroundColor: '#BEBEBE',
//     marginHorizontal: 20,
//   },
//   textId: {
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 12,
//     lineHeight: 15,
//     textAlign: 'center',
//     color: '#8E8E8E',
//   },
//   textPassword: {
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 12,
//     lineHeight: 15,
//     textAlign: 'center',
//     color: '#8E8E8E',
//   },
//   textSignup: {
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontSize: 12,
//     lineHeight: 15,
//     textAlign: 'center',
//     color: '#8E8E8E',
//   },
// });
