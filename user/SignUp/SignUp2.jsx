import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Header from '../../Header';

export default function SignUp2() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params; // SignUp1에서 전달된 데이터
  const [imageUri, setImageUri] = useState('');
  const [userName, setUserName] = useState('');

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('권한 거부', '이 앱은 사진 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { assets } = result;
      if (assets && assets.length > 0) {
        const uri = assets[0].uri;
        const fileName = uri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
          await FileSystem.copyAsync({
            from: uri,
            to: newPath,
          });
          setImageUri(newPath);
          Alert.alert('이미지 선택 완료', '이미지가 성공적으로 선택되었습니다.', [{ text: '확인' }]);
        } catch (error) {
          console.error('이미지 저장 오류:', error);
        }
      }
    }
  };

  const handleNext = () => {
    const updatedUserData = { ...userData, user_name: userName, user_profile_image: imageUri };
    console.log('SignUp2 userData:', updatedUserData);
    navigation.navigate('SignUp3', { userData: updatedUserData });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="회원가입" navigation={navigation} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>사진과 이름을 등록해주세요.</Text>

            <View style={styles.profileContainer}>
              <View style={styles.bigCircle}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.profilePicture} />
                ) : (
                  <View style={styles.profilePicturePlaceholder} />
                )}
              </View>

              <TouchableOpacity onPress={handleSelectImage} style={styles.smallCircleContainer}>
                <View style={styles.smallCircle} />
              </TouchableOpacity>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>이름을 입력해주세요</Text>
                <TextInput 
                  style={styles.input1} 
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>다음</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    width: '100%',
    height: 852,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    maxWidth: 400,
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 36,
    color: '#000000',
    marginTop: 40,
  },
  bigCircle: {
    width: 207.69,
    height: 207.69,
    backgroundColor: '#D9D9D9',
    borderRadius: 103.845,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 103.845,
  },
  profilePicturePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 103.845,
  },
  smallCircleContainer: {
    position: 'absolute',
    left: 250,
    top: 280,
    backgroundColor: '#D9D9D9',
  },
  smallCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 13.845,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#C9C9C9',
    marginBottom: 8,
  },
  input1: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  nextButton: {
    width: '100%',
    maxWidth: 359,
    height: 48,
    backgroundColor: '#7F7FFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 35,
    color: '#FFFFFF',
  },
});



// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import axios from 'axios';
// import Header from '../Header';

// export default function SignUp2() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { userData } = route.params; // SignUp1에서 전달된 데이터
//   const [imageUri, setImageUri] = useState('');
//   const [userName, setUserName] = useState('');

//   const handleSelectImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       Alert.alert('권한 거부', '이 앱은 사진 접근 권한이 필요합니다.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const { assets } = result;

//       console.log(result);
//       if (assets && assets.length > 0) {
//         const uri = assets[0].uri;
//         const fileName = uri.split('/').pop();
//         const newPath = FileSystem.documentDirectory + fileName;

//         try {
//           await FileSystem.copyAsync({
//             from: uri,
//             to: newPath,
//           });
//           setImageUri(newPath);
//           Alert.alert('이미지 선택 완료', '이미지가 성공적으로 선택되었습니다.', [{ text: '확인' }]);
//         } catch (error) {
//           console.error('이미지 저장 오류:', error);
//         }
//       }
//     }
//   };

//   const handleNext = () => {
//     navigation.navigate('SignUp3', { userData: { ...userData, user_name: userName, user_profile_image: imageUri } });
//     console.log("user",userData);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Header title="회원가입" navigation={navigation} />
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//           <View style={styles.container}>
//             <Text style={styles.title}>사진과 이름을 등록해주세요.</Text>

//             <View style={styles.profileContainer}>
//               <View style={styles.bigCircle}>
//                 {imageUri ? (
//                   <Image source={{ uri: imageUri }} style={styles.profilePicture} />
//                 ) : (
//                   <View style={styles.profilePicturePlaceholder} />
//                 )}
//               </View>

//               <TouchableOpacity onPress={handleSelectImage} style={styles.smallCircleContainer}>
//                 <View style={styles.smallCircle} />
//               </TouchableOpacity>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>이름을 입력해주세요</Text>
//                 <TextInput 
//                   style={styles.input1} 
//                   value={userName}
//                   onChangeText={setUserName}
//                 />
//               </View>

//               <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//                 <Text style={styles.nextButtonText}>다음</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     position: 'relative',
//     width: '100%',
//     height: 852,
//     backgroundColor: '#FFFFFF',
//   },
//   profileContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     width: '100%',
//     maxWidth: 400,
//     fontWeight: '700',
//     fontSize: 28,
//     lineHeight: 36,
//     color: '#000000',
//     marginTop: 40,
//   },
//   bigCircle: {
//     width: 207.69,
//     height: 207.69,
//     backgroundColor: '#D9D9D9',
//     borderRadius: 103.845,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profilePicture: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 103.845,
//   },
//   profilePicturePlaceholder: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#D9D9D9',
//     borderRadius: 103.845,
//   },
//   smallCircleContainer: {
//     position: 'absolute',
//     left: 250,
//     top: 280,
//     backgroundColor: '#D9D9D9',
//   },
//   smallCircle: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 13.845,
//   },
//   inputGroup: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontWeight: '700',
//     fontSize: 16,
//     lineHeight: 19,
//     color: '#C9C9C9',
//     marginBottom: 8,
//   },
//   input1: {
//     width: '100%',
//     height: 48,
//     backgroundColor: '#FFFFFF',
//     borderColor: '#EEEEEE',
//     borderWidth: 1,
//     borderRadius: 6,
//     paddingHorizontal: 8,
//   },
//   nextButton: {
//     width: '100%',
//     maxWidth: 359,
//     height: 48,
//     backgroundColor: '#7F7FFF',
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 70,
//   },
//   nextButtonText: {
//     fontWeight: '600',
//     fontSize: 16,
//     lineHeight: 35,
//     color: '#FFFFFF',
//   },
// });
