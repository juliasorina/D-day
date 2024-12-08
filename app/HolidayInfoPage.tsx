import { Button } from "@/components/button";
import { MainStyles } from "@/constants/MainStyles";
import { getStringDaysLeft } from "@/scripts/date-scripts";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import Icons from '@expo/vector-icons/MaterialIcons'
import { Header } from "@/components/header";
import { getItem, setItem } from "@/scripts/async-storage";
import { useState } from "react";
import { ModalWindow } from "@/components/modalWindow";

export default function HolidayInfoPage() {
    const {id, date, title, description, notes, notifications, activeDateYear} : {id: string, date: string, title: string, description: string, notes: string, notifications: string, activeDateYear: string} = useLocalSearchParams();
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dateArray = date.split('.');
    const stringDaysLeft = getStringDaysLeft(dateArray, activeDateYear);

    const deleteHoliday = async () => {
        const holidays: any[] = await getItem('holidays');
        const awaitedNewHolidays = (await Promise.all(holidays)).filter(item => {
            if(item.id == id) {
                return
            }
            return item
        });
        await setItem('holidays', [...awaitedNewHolidays]);
        router.navigate('/');
    };

    return (
        <View style={[MainStyles.container, {flex: 1, justifyContent: 'space-between', paddingBottom: 24}]}>
            <View style={{gap: 32}}>
                <Header date={date} activeDateYear={activeDateYear} onPressBack={() => router.navigate('/')}/>
                <View style={{gap: 24}}>
                    <View style={{gap: 8}}>
                        <Text style={MainStyles.h2}>{title}</Text>
                        {stringDaysLeft && <Text style={MainStyles.thin}>{stringDaysLeft}</Text>}
                    </View>
                    {description  && <View style={{gap: 8}}>
                        <Text style={MainStyles.h4}>Описание:</Text>
                        <Text style={MainStyles.p}>{description}</Text>
                    </View>}
                    {notes && <View style={{gap: 8}}>
                        <Text style={MainStyles.h4}>Пометки:</Text>
                        <Text style={MainStyles.p}>{notes}</Text>
                    </View>}
                </View>
            </View>

            <View style={{gap: 8}}>
                <Button primary onPress={() => router.navigate({pathname: "/createNewHolidayPage", params: { id: id, date: date, title: title, description: description, notes: notes, notifications: notifications, activeDateYear: activeDateYear }})}>
                    <Icons size={24} color={'white'} name='edit'/>
                    <Text style={[MainStyles.h4, {color: 'white'}]}>Редактировать событие</Text>
                </Button>
                <Button onPress={() => setIsModalVisible(true)}>
                    <Icons size={24} name='delete'/>
                    <Text style={[MainStyles.p]}>Удалить событие</Text>
                </Button>
            </View>

            <ModalWindow isVisible={isModalVisible} title="Удалить событие?" onClose={() => setIsModalVisible(false)} onAgree={() => deleteHoliday()}/>
        </View>
    )
}