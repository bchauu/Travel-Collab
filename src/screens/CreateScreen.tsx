import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import CreateAccountForm from '../component/account/CreateAccountForm';
import {AuthStackParamList} from '../types/types';

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const CreateScreen: React.FC<Props> = ({navigation}) => {
  const handleCreateAccount = (data: {
    // this should go to useAuth and then send to backend to register and authenticate
    username: string;
    email: string;
    password: string;
  }) => {
    console.log('Account has been created with:', data);
  };

  return (
    <View style={styles.container}>
      <Text> Create Account </Text>
      <CreateAccountForm onSubmit={handleCreateAccount} />
      <Button
        title="Login Instead"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateScreen;
