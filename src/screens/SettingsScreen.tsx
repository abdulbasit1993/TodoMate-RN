import React from 'react';
import {View, Text, StyleSheet, Switch, Button} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import {setTheme, toggleUseSystemTheme} from '../redux/slices/themeSlice';
import Spacer from '../components/Spacer';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const {theme, useSystemTheme} = useSelector(state => state.themeReducer);
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper style={{marginTop: insets.top}}>
      <Header title="Settings" isBack />

      <View style={styles.container}>
        <Spacer mT={30} />
        <View style={styles.row}>
          <CustomText>Use System Theme</CustomText>
          <Switch
            value={useSystemTheme}
            onValueChange={() => dispatch(toggleUseSystemTheme())}
          />
        </View>

        <Spacer mT={25} />

        {!useSystemTheme && (
          <View style={[styles.row, {marginTop: ms(10)}]}>
            <Button
              title="Switch to Light Mode"
              onPress={() => dispatch(setTheme('light'))}
              color={theme === 'light' ? 'blue' : 'gray'}
            />

            <Button
              title="Switch to Dark Mode"
              onPress={() => dispatch(setTheme('dark'))}
              color={theme === 'dark' ? 'blue' : 'gray'}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SettingsScreen;
