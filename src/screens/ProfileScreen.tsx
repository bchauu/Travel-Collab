import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import LogOut from '../component/account/LogOut';
import LoginField from '../component/account/LoginField';
import useApiConfig from '../utils/apiConfig';

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {token} = useApiConfig();

  useEffect(() => {
    if (token) {
      console.log(token, 'should exist after logging in');
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <View>
      <Text>Profile Screen</Text>
      {isLoggedIn ? <LogOut setIsLoggedIn={setIsLoggedIn} /> : <LoginField />}
    </View>
  );
};

export default ProfileScreen;
