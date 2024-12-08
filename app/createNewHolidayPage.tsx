import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Field } from "@/components/field";
import { Header } from "@/components/header";
import { MainStyles } from "@/constants/MainStyles";
import Icons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getItem, setItem } from "../scripts/async-storage"
import { deleteNotifications, scheduleNotifications } from "@/scripts/notifications";

export default function CreateNewHolidayPage() {
    const {id, date, title, description, notes, notifications, activeDateYear} : {id: string, date: string, title: string, description: string, notes: string, notifications: string, activeDateYear: string} = useLocalSearchParams();
    
    const notificationsObj = notifications ? JSON.parse(notifications) : {};

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newNotes, setNewNotes] = useState(notes);

    const [is1day, setIs1day] = useState(notificationsObj.id1day && notificationsObj.id1day.length != 0 ? true : false);
    const [is2day, setIs2day] = useState(notificationsObj.id2day && notificationsObj.id2day.length != 0 ? true : false);
    const [isWeek, setIsWeek] = useState(notificationsObj.idWeek && notificationsObj.idWeek.length != 0 ? true : false);
    const [isMonth, setIsMonth] = useState(notificationsObj.idMonth && notificationsObj.idMonth.length != 0  ? true : false);
    const [isYear, setIsYear] = useState(notificationsObj.idYear && notificationsObj.idYear.length != 0  ? true : false);

    const [isYearly, setIsYearly] = useState(notificationsObj.isYearly ? notificationsObj.isYearly : false);

    const createNewHoliday = async () => {
        if(newTitle && newTitle.length != 0) {
            const holidays: any[] = await getItem('holidays');
            const notificationsAgreements = {
                is1day: is1day, 
                is2day: is2day, 
                isMonth: isMonth, 
                isWeek: isWeek, 
                isYear: isYear, 
                isYearly: isYearly
            };
            const dateArray = date.split('.');
            const awaitedNewHolidays = holidays ? (await Promise.all(holidays)).filter(item => {
                if(item.id == id) {
                    deleteNotifications(item.notifications)
                    return
                }
                return item
            }) : [];

            const newHoliday = {
                id: Date.now(), 
                date: isYearly ? date : `${dateArray[0]}.${dateArray[1]}`,
                title: newTitle,
                description: newDescription,
                notes: newNotes,
                notifications: await scheduleNotifications(newTitle, date, activeDateYear, notificationsAgreements),
            }

            await setItem('holidays', [...awaitedNewHolidays, newHoliday]);
            router.navigate('/');
        }
    }

    return(
        <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={[MainStyles.container, {justifyContent: 'space-between', gap: 32, paddingBottom: 24}]}>
            <View style={{gap: 32}}>
                <Header date={date} activeDateYear={activeDateYear} onPressBack={() => id ? router.navigate({pathname: "/HolidayInfoPage", params: { id: id, date: date, title: title, description: description, notes: notes, notifications: notifications, activeDateYear: activeDateYear }}) : router.navigate('/')}/>
                <View style={{gap: 24}}>
                    <Field title='Наименование события:' value={newTitle} setValue={setNewTitle}/>
                    <Field title='Описание:' value={newDescription} setValue={setNewDescription} isMultiLine/>
                    <Field title='Пометки:' value={newNotes} setValue={setNewNotes} isMultiLine/>
                    <View style={{gap: 8}}>
                        <Text style={MainStyles.h4}>Напоминания:</Text>
                        <Checkbox title='За 1 день' isChecked={is1day} setIsChecked={setIs1day}/>
                        <Checkbox title='За 2 дня' isChecked={is2day} setIsChecked={setIs2day}/>
                        <Checkbox title='За неделю' isChecked={isWeek} setIsChecked={setIsWeek}/>
                        <Checkbox title='За месяц' isChecked={isMonth} setIsChecked={setIsMonth}/>
                        <Checkbox title='За год' isChecked={isYear} setIsChecked={setIsYear}/>
                    </View>
                    <Checkbox primary title='Ежегодное событие' isChecked={isYearly} setIsChecked={setIsYearly}/>
                </View>
            </View>

            <Button onPress={() => createNewHoliday()} primary>
                <Icons size={24} color={'white'} name='check'/>
                <Text style={[MainStyles.h4, {color: 'white'}]}>Сохранить изменения</Text>
            </Button>
        </ScrollView>
    )
}