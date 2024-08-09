import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LoginScreen from './user/LoginScreen';
import IdFindScreen from './user/IdFind';
import PasswordResetScreen from './user/PasswordReset';
import SignUpAgree from './user/SignUp/SignUpAgree';
import SignUp1 from './user/SignUp/SignUp1';
import SignUp2 from './user/SignUp/SignUp2';
import SignUp3 from './user/SignUp/SignUp3';
import SignIn from './user/SignIn';

// import AnotherScreen from './user/AnotherScreen'; 

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

// 탭 네비게이터 정의
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
          position: 'absolute',
          top: 84, // 원하는 위치에 맞게 조정,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 22,
          color: '#000000',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#222222', // 언더라인 색상
          height: 4,
          borderRadius: 2,
          position: 'absolute',
          top: 36, // 탭 아래에 위치
        },
      }}
    >
      <Tab.Screen name="IdFind" component={IdFindScreen} />
      <Tab.Screen name="PasswordReset" component={PasswordResetScreen} />
    </Tab.Navigator>
  );
}

// 메인 앱 컴포넌트 정의
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // 모든 화면에서 제목 숨기기
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="SignUpAgree" component={SignUpAgree} />
        <Stack.Screen name="SignUp1" component={SignUp1} />
        <Stack.Screen name="SignUp2" component={SignUp2} />
        <Stack.Screen name="SignUp3" component={SignUp3} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
