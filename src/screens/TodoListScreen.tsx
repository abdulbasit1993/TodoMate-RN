import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const TodoListScreen = () => {
  const theme = useSelector(state => state.theme.theme);

  console.log('theme ===>> ', theme);

  return (
    <View>
      <Text>TodoListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TodoListScreen;
