import { Dimensions, StyleSheet, Text } from 'react-native';
import { Calendar } from '@/components/calendar';
import { Card } from '@/components/card';
import { useEffect, useState } from 'react';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { MainStyles } from '@/constants/MainStyles';
import { Button } from '@/components/button';
import Icons from '@expo/vector-icons/MaterialIcons'
import { LinearGradient } from 'expo-linear-gradient';
import { EmptyCard } from '@/components/emptyCard';
import { getItem } from '@/scripts/async-storage';
import { router } from 'expo-router';

export default function HomeScreen() {
    const [holidays, setHolidays] = useState<any[]>([]);
    const [selectedDates, setSelectedDates] = useState<any[]>([]);
    
    const [activeDate, setActiveDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>();
    
    const windowHeight = Dimensions.get('window').height;
    const buttonsOffset = useSharedValue<number>(-windowHeight);
    const gradientOffset = useSharedValue<number>(-windowHeight);

    const findHolidays = async () => {
        const result: any[] = await getItem('holidays');

        if(result) {
            const newHolidays: any[] = [];

            result.map((item) => {
                if (item.date.length === 5) {
                    item.date.slice(3) === `${activeDate.getMonth() + 1}` && newHolidays.push(item);
                } else {
                    item.date.slice(3) === `${activeDate.getMonth() + 1}.${activeDate.getFullYear()}` && newHolidays.push(item);
                }
            });
            newHolidays.sort((a, b) => {
                const aDateArray = a.date.split('.');
                const bDateArray = b.date.split('.');
                
                const aDate = Date.parse(`${activeDate.getFullYear()}-${aDateArray[1]}-${aDateArray[0]}`);
                const bDate = Date.parse(`${activeDate.getFullYear()}-${bDateArray[1]}-${bDateArray[0]}`);
                
                return aDate - bDate
            });

            setHolidays(newHolidays);
            setSelectedDates(newHolidays);
        }
    };

    useEffect(() => {
        findHolidays();
    }, [activeDate])

    useEffect(() => {
        setSelectedDates(selectedDate ? 
            holidays.filter((item) => {
                let day = item.date.split('.')[0];
                day = day.charAt(0) == '0' ? day.charAt(1) : day;
                return day === selectedDate.getDate().toString();
            }) : holidays);
    }, [selectedDate])

    const setSelected = (value: Date | undefined) => {
        if(selectedDate && !value) {
            buttonsOffset.value = withTiming(-windowHeight, {duration: 300});
            gradientOffset.value = withTiming(-windowHeight, {duration: 300});
            setSelectedDate(value);

        }
        else if(!selectedDate && value) {
            buttonsOffset.value = withTiming(24, {duration: 300});
            gradientOffset.value = withTiming(0, {duration: 300});
            setSelectedDate(value);
        }
        else {
            setSelectedDate(value);
        }
    };

    const buttonsAnimatedStyles = useAnimatedStyle(() => ({
        bottom: buttonsOffset.value,
    }));

    const gradientAnimatedStyles = useAnimatedStyle(() => ({
        bottom: gradientOffset.value,
    }));

    return (
        <Animated.View style={[MainStyles.container, {flex: 1, gap: 32}]}>
            <Calendar markedDates={holidays} activeDate={activeDate} setActiveDate={setActiveDate} selectedDate={selectedDate} setSelectedDate={setSelected}/>
            
            {selectedDates.length == 0 && selectedDate != undefined &&
            <EmptyCard
                date={`${selectedDate.getDate()}.${selectedDate.getMonth() + 1}.${selectedDate.getFullYear()}`} 
                title={'Cобытий не запланировано'} 
                activeDate={activeDate}
            >
            </EmptyCard>}

            <Animated.ScrollView
                    contentContainerStyle={{gap: 8}}
                    layout={LinearTransition.springify().duration(300)}
            >
                {selectedDates.map((item) => 
                <Card key={item.id} id={item.id} date={item.date} title={item.title} description={item.description} notes={item.notes} notifications={JSON.stringify(item.notifications)} activeDate={activeDate}/>)}
            </Animated.ScrollView>

            <Animated.View style={[StyleSheet.absoluteFill, {pointerEvents: 'none'}, gradientAnimatedStyles]}>
                <LinearGradient style={[StyleSheet.absoluteFill, {pointerEvents: 'none'}]} colors={['transparent', 'white']} locations={[0.7, 1]}/>
            </Animated.View>
            
            <Animated.View style={[buttonsAnimatedStyles, {backgroundColor: 'white', position: 'absolute', width: '100%', left: 24, gap: 8}]}>
                {selectedDates.length != 0 && selectedDate != undefined &&
                <Button onPress={() => router.navigate({pathname: '/createNewHolidayPage', params: { date: `${selectedDate.getDate()}.${selectedDate.getMonth() + 1}.${selectedDate.getFullYear()}`, activeDateYear: activeDate.getFullYear()}})} secondary>
                    <Icons size={24} name='edit'/>
                    <Text style={MainStyles.p}>Создать новое событие</Text>
                </Button>}
                <Button onPress={() => setSelected(undefined)}>
                    <Icons size={24} name='list'/>
                    <Text style={MainStyles.p}>Вернуться ко всем событиям</Text>
                </Button>
            </Animated.View>
        </Animated.View>
    );
}