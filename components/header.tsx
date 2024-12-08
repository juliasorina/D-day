import { MainStyles } from "@/constants/MainStyles"
import { Text, TouchableOpacity, View } from "react-native"
import { GradientText } from "./gradientText"
import Icons from "@expo/vector-icons/MaterialIcons"

export const Header = ({date, activeDateYear, onPressBack} : {date: string, activeDateYear: string, onPressBack: () => void}) => {
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
    const day = dateArray[0].charAt(0) == '0' ? dateArray[0].charAt(1) : dateArray[0];

    return(
        <View style={{alignItems: 'center'}}>
            <Text style={MainStyles.h3}>{activeDateYear}</Text>
            <View style={{width: '100%', alignItems: 'center'}}>
                <TouchableOpacity style={{position: 'absolute', height: '100%', justifyContent: 'center', left: 0,}} onPress={onPressBack} activeOpacity={0.6}>
                    <Icons size={24} name='chevron-left'/>
                </TouchableOpacity>
                <GradientText style={[MainStyles.h1, {paddingLeft: 32}]}>{`${day} ${months[+dateArray[1] - 1]}`}</GradientText>
            </View>
        </View>
    )
}