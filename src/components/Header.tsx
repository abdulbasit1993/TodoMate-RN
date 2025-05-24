import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  isBack?: boolean;
  isHome?: boolean;
}

const Header = ({title, isBack, isHome}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        {isBack && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesignIcon style={styles.backIcon} name="arrowleft" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerView}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.rightView}>
        {isHome && (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicon style={styles.backIcon} name="settings-sharp" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: ms(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftView: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightView: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: ms(19),
    fontWeight: '700',
    color: colors.black,
  },
  backIcon: {
    color: colors.black,
    fontSize: ms(30),
  },
});

export default Header;
