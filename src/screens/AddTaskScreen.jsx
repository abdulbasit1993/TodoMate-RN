import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {
  backgroundColors,
  borderColors,
  colors,
  textColors,
} from '../constants/colors';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import Spacer from '../components/Spacer';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../components/CustomButton';
import {addTodo} from '../redux/slices/todoSlice';

const AddTaskScreen = ({navigation}) => {
  const theme = useSelector(state => state.themeReducer.theme);
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Low', value: 'low'},
    {label: 'High', value: 'high'},
  ]);
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatepicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    setDate(date);
    hideDatePicker();
  };

  const generateId = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();

  const handleAddTask = () => {
    if (title.trim() === '') {
      ToastAndroid.show('Please Enter Task Name', ToastAndroid.SHORT);
      return;
    }

    if (value === null) {
      ToastAndroid.show('Please Select Priority', ToastAndroid.SHORT);
      return;
    }

    if (date === null) {
      ToastAndroid.show('Please Select Date', ToastAndroid.SHORT);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      ToastAndroid.show(
        'Please Select Today or a Future Date',
        ToastAndroid.SHORT,
      );
      return;
    }

    const newTaskData = {
      id: generateId(),
      name: title,
      priority: value,
      dueDate: date.toISOString(),
      status: 'pending',
    };

    dispatch(addTodo(newTaskData));
    ToastAndroid.show('Task Added Successfully!', ToastAndroid.SHORT);

    setTitle('');
    setValue(null);
    setDate(null);

    navigation?.navigate('TodoList');
  };

  return (
    <ScreenWrapper style={{marginTop: insets.top}}>
      <Header title="Add Task" isBack />

      <View style={styles.subContainer}>
        <Spacer mT={15} />

        <CustomText style={styles.label}>Task Name:</CustomText>

        <Spacer mT={15} />

        <CustomInput value={title} onChangeText={text => setTitle(text)} />

        <Spacer mT={20} />

        <CustomText style={styles.label}>Priority:</CustomText>

        <Spacer mT={15} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            backgroundColor: backgroundColors[theme],
            borderColor: borderColors[theme],
            borderWidth: 1,
          }}
          textStyle={{color: textColors[theme]}}
          arrowIconStyle={{tintColor: textColors[theme]}}
          placeholder="Select Task Priority"
          placeholderStyle={{color: textColors[theme]}}
          dropDownContainerStyle={{
            backgroundColor: backgroundColors[theme],
            borderColor: borderColors[theme],
            borderWidth: 1,
          }}
          tickIconStyle={{tintColor: textColors[theme]}}
        />

        <Spacer mT={20} />

        <CustomText style={styles.label}>Due Date:</CustomText>

        <Spacer mT={15} />

        <TouchableOpacity
          style={[styles.dateButton, {borderColor: borderColors[theme]}]}
          onPress={showDatepicker}>
          <CustomText style={{color: textColors[theme]}}>
            {date ? date.toDateString() : 'Select Date'}
          </CustomText>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={'date'}
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        <Spacer mT={45} />

        <CustomButton
          onPress={() => {
            handleAddTask();
          }}
          title="Add"
          customStyle={{alignSelf: 'center'}}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    paddingHorizontal: ms(15),
  },
  label: {
    fontSize: ms(20),
    fontWeight: '600',
  },
  dateButton: {
    height: ms(45),
    borderWidth: 1,
    borderRadius: ms(5),
    justifyContent: 'center',
    paddingHorizontal: ms(10),
  },
});

export default AddTaskScreen;
