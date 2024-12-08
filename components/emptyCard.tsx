import { Colors } from "@/constants/Colors";
import { MainStyles } from "@/constants/MainStyles";
import Icons from "@expo/vector-icons/MaterialIcons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./button";
import { getStringDaysLeft } from "@/scripts/date-scripts";

export const EmptyCard = ({date, title, activeDate} : 
    {date: string, title: string, activeDate: Date}) => {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];

    const dateArray = date.split('.');
    const activeDateYear = activeDate.getFullYear();
    const day = dateArray[0].charAt(0) == '0' ? dateArray[0].charAt(1) : dateArray[0];
    const stringDaysLeft = getStringDaysLeft(dateArray, activeDateYear);

    return(
        <Link asChild href={{
            pathname: "/createNewHolidayPage",
            params: { date: date, activeDateYear: activeDateYear }
        }}>
            <TouchableOpacity activeOpacity={0.6} 
            style={{
                backgroundColor: 'white',
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: 16, 
                gap: 8
                }}>
                <MaskedView style={StyleSheet.absoluteFill} 
                    maskElement={
                        <View style={[StyleSheet.absoluteFill, {borderWidth: 2, borderRadius: 4}]}/>
                    }>
                    <LinearGradient style={StyleSheet.absoluteFill} colors={[Colors.pink, Colors.orange]} end={{x: 1, y: 0}}/>
                </MaskedView>
                <View style={{flex: 1, gap: 8}}>
                    <View style={{flexDirection: 'row', gap: 8}}>
                        <Text style={MainStyles.h4}>{`${day} ${months[+dateArray[1] - 1]}`}</Text>
                        <Text style={MainStyles.thin}>{stringDaysLeft}</Text>
                    </View>
                    <Text style={MainStyles.p}>{title}</Text>
                    <Button sty primary>
                        <Icons size={24} color={'white'} name='edit'/>
                        <Text style={[MainStyles.h4, {color: 'white'}]}>Создать событие</Text>
                    </Button>
                </View>
            </TouchableOpacity>
        </Link>
    );
}