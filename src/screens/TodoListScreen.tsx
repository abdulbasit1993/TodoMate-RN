import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  backgroundColors,
  borderColors,
  colors,
  textColors,
} from '../constants/colors';
import FloatingActionButton from '../components/FloatingActionButton';
import ScreenWrapper from '../components/ScreenWrapper';
import {FlashList} from '@shopify/flash-list';
import CustomText from '../components/CustomText';
import {ms} from 'react-native-size-matters';
import Spacer from '../components/Spacer';
import Checkbox from '../components/Checkbox';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  archiveOldCompleted,
  deleteTodo,
  toggleStatus,
} from '../redux/slices/todoSlice';

const TodoListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const theme = useSelector(state => state.themeReducer.theme);
  const todos = useSelector(state => state.todoReducer.todos);

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.priority === b.priority) return 0;
    return a.priority === 'high' ? -1 : 1;
  });

  console.log('sortedTodos ==>> ', sortedTodos);

  const handleDeleteTodo = item => {
    dispatch(deleteTodo(item));
  };

  const handleUpdateTodo = item => {
    dispatch(toggleStatus(item?.id));
  };

  const renderTodos = ({item, index}) => {
    return (
      <View
        style={[
          styles.todoItem,
          {
            borderColor: theme === 'dark' ? colors.white : colors.black,
            backgroundColor: theme === 'dark' ? colors.black : colors.white,
          },
        ]}>
        <View style={styles.todoLeftItem}>
          <Checkbox
            onPress={() => {
              console.log('item checked ==>> ', item);
              handleUpdateTodo(item);
            }}
            checked={item?.status === 'completed'}
          />
        </View>
        <View style={styles.todoCenterItem}>
          <CustomText style={styles.todoName}>{item?.name}</CustomText>

          <View style={styles.row}>
            <CustomText style={styles.priorityText}>Priority:</CustomText>
            <CustomText style={[styles.priorityText, {marginLeft: ms(5)}]}>
              {item?.priority.charAt(0).toUpperCase() + item?.priority.slice(1)}
            </CustomText>
          </View>

          <View style={styles.row}>
            <CustomText style={styles.priorityText}>Status:</CustomText>
            <CustomText style={[styles.priorityText, {marginLeft: ms(5)}]}>
              {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
            </CustomText>
          </View>
        </View>
        <View style={styles.todoRightItem}>
          <TouchableOpacity
            onPress={() => handleDeleteTodo(item)}
            activeOpacity={0.7}>
            <Ionicon name="trash" size={ms(25)} color={textColors[theme]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    dispatch(archiveOldCompleted());
  }, []);

  return (
    <ScreenWrapper style={{marginTop: insets.top}}>
      <Header title="Task List" isHome />

      <Spacer mT={15} />

      <View style={styles.subContainer}>
        <FlashList
          data={sortedTodos}
          renderItem={renderTodos}
          estimatedItemSize={59}
          extraData={theme}
          ListEmptyComponent={() => {
            return (
              <View style={{alignItems: 'center', marginTop: ms(20)}}>
                <CustomText style={{fontSize: ms(18)}}>
                  No Tasks Found!
                </CustomText>
                <Spacer mT={10} />
                <CustomText style={{textAlign: 'center', fontSize: ms(12)}}>
                  To Add a Task, Tap the + button on the bottom right corner
                </CustomText>
              </View>
            );
          }}
        />
      </View>

      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddTask');
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    height: '73%',
    paddingHorizontal: ms(15),
  },
  todoItem: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: ms(10),
    padding: ms(10),
    marginBottom: ms(15),
  },
  row: {
    flexDirection: 'row',
  },
  todoName: {
    fontSize: ms(18),
    fontWeight: '700',
  },
  priorityText: {
    fontSize: ms(12),
    fontWeight: '400',
  },
  todoLeftItem: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(10),
  },
  todoCenterItem: {
    width: '80%',
  },
  todoRightItem: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TodoListScreen;
