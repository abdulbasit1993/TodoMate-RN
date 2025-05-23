import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TodoListScreen, SettingsScreen} from '../screens';
import {useDispatch} from 'react-redux';
import {Appearance} from 'react-native';
import {updateSystemTheme} from '../redux/slices/themeSlice';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      dispatch(updateSystemTheme(colorScheme));
    });
    return () => subscription.remove();
  }, []);

  return (
    <Stack.Navigator initialRouteName="TodoList">
      <Stack.Screen name="TodoList" component={TodoListScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
