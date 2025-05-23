import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../assets/images';

const Splash = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '80%',
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={Images.logo} style={styles.image} resizeMode="contain" />
      </View>

      <ActivityIndicator size="large" color={'#000000'} />
      <Text style={styles.text}>TodoMate is Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: '#000000',
  },
});

export default Splash;
