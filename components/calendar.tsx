import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainStyles } from '@/constants/MainStyles';
import { GradientText } from './gradientText';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export const Calendar = ({ markedDates = [], activeDate, setActiveDate, selectedDate, setSelectedDate } : 
    { markedDates?: {id: string, date: string, title: string}[], activeDate: Date, setActiveDate: (date: Date) => void, selectedDate: Date | undefined, setSelectedDate: (date: Date | undefined) => void}) => {
    
    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];

    const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const currentDate = new Date();

    const offset = useSharedValue<number>(0);
    const opacity = useSharedValue<number>(1);

    const activeMarkedDates = markedDates.map(({ date }) => { 
        let day = date.split('.')[0];
        return day.charAt(0) == '0' ? day.charAt(1) : day}); 

    const selectItem = (item: number) => {
        const newDate = new Date(activeDate);
        newDate.setDate(item);
        setSelectedDate(newDate);
    };

    const changeMonth = (n: number) => {
        opacity.value = withTiming(0.1, {duration: 300});
        const newDate = new Date(activeDate);
        newDate.setMonth(newDate.getMonth() + n);
        setActiveDate(newDate);
        setSelectedDate(undefined);
        setTimeout(() => {
            opacity.value = withTiming(1, {duration: 300});
        }, 300);
    };
  

    const generateMatrix = () => {
        var matrix: (string | number)[][] = [];
        // Create header
        matrix[0] = weekDays;

        var year = activeDate.getFullYear();
        var month = activeDate.getMonth();
        var firstDay = new Date(year, month, 0).getDay();

        var maxDays = nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;
    }

    var matrix = generateMatrix();

    var rows = [];
    rows = matrix.map((row, rowIndex) => {
        var rowItems = row.map((item, colIndex) => {
            const isMarked = activeMarkedDates.includes(item.toString());
            const isSelected = selectedDate ? item == selectedDate.getDate() : false;
            const isCurrent = item == currentDate.getDate() && 
            activeDate.getMonth() == currentDate.getMonth() && 
            activeDate.getFullYear() == currentDate.getFullYear();
            const isPressable = typeof item === 'number' && item != -1;
            
            return (
                isPressable ?
                (<TouchableOpacity
                    key={`${rowIndex}-${colIndex}`}
                    style={{flex: 1}}
                    onPress={() => {selectItem(item)}}
                    activeOpacity={0.6}
                >
                    <LinearGradient style={[styles.cell]} colors={isMarked ? isSelected ? [Colors.pink50, Colors.orange50] : [Colors.pink, Colors.orange] : ['transparent', 'transparent']}>
                        <Text 
                            style={[MainStyles.p, {
                                fontWeight: isCurrent || isMarked ? '900' : '400',
                                color: isMarked ? 'white' : isCurrent ? Colors.pink : 'black',
                        }]}>
                            {item != -1 ? item : ''}
                        </Text>
                    </LinearGradient>
                    {isSelected && 
                    <MaskedView style={StyleSheet.absoluteFill} 
                        maskElement={
                            <View style={[StyleSheet.absoluteFill, {borderWidth: 2, borderRadius: 4}]}>
                                <View style={[StyleSheet.absoluteFill, 
                                    {backgroundColor: '#000', 
                                    width: 20, 
                                    height: 20, 
                                    position: 'absolute', 
                                    top: -2, 
                                    right: -2, 
                                    left: 'auto', 
                                    borderRadius: 4}]}/>
                            </View>
                    }>
                        <LinearGradient style={styles.cell} colors={[Colors.pink, Colors.orange]}>
                            <Icons style={{
                                position: 'absolute', 
                                padding: 4,
                                top: 0, 
                                right: 0, 
                                left: 'auto',
                            }} size={12} color={'white'} name='edit'/>
                        </LinearGradient>
                    </MaskedView>}
                </TouchableOpacity>)
                :
                (<View
                    key={`${rowIndex}-${colIndex}`}
                    style={[styles.cell, {flex: 1}
                ]}>
                    <Text style={MainStyles.p}>
                        {item != -1 ? item : ''}
                    </Text>
                </View>)
            );
        });

        return (
            <View
                key={rowIndex}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
            }}>
            {rowItems}
            </View>
        );
    });

    const pan = Gesture.Pan()
        .onChange((event) => {
            offset.value = event.translationX;
        })
        .onFinalize(() => {
            if(offset.value < -100) {
                changeMonth(+1);
            }
            if(offset.value > 100) {
                changeMonth(-1);
            }
            offset.value = withSpring(0);
        })
        .runOnJS(true);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
          { translateX: offset.value },
        ],
        opacity: opacity.value,
    }));
    
    return (
        <GestureHandlerRootView style={{flexGrow: 0}}>
            <GestureDetector gesture={pan}>
                <Animated.View style={[animatedStyles]}>
                    <View style={styles.header}>
                        <Text style={MainStyles.h3}>{activeDate.getFullYear()}</Text>
                        <View style={styles.mainText}>
                            <TouchableOpacity onPress={() => changeMonth(-1)}>
                                <Icons size={24} name='chevron-left'/>
                            </TouchableOpacity>
                            <GradientText style={MainStyles.h1}>{months[activeDate.getMonth()]}</GradientText>
                            <TouchableOpacity onPress={() => changeMonth(+1)}>
                                <Icons size={24} name='chevron-right'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ gap: 4}}>
                        { rows }
                    </View>
                </Animated.View>
            </GestureDetector> 
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    cell: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    mainText: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center'
    }
})