import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'userInfo';

export const setUser = async (user) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error setting user:', error);
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting user:', error);
    return null;
    }
};

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error removing user:', error);
    }
};
