import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

const requestNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if(existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Необходимы разрешения для получения уведомлений');
        }
    }
};

export const scheduleNotifications = async (title: string, date: string, activeDateYear: string, notificationsAgreements: {is1day: boolean, is2day: boolean, isWeek: boolean, isMonth: boolean, isYear: boolean, isYearly: boolean}) => {
    const dateArray = date.split('.');
    const holidayDate = dateArray[2] == undefined ? Date.parse(`${activeDateYear}-${dateArray[1]}-${dateArray[0]}`) : 
    Date.parse(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);

    let id1day = '';
    let id2day = '';
    let idWeek = '';
    let idMonth = '';
    let idYear = '';

    const is1day = notificationsAgreements.is1day;
    const is2day = notificationsAgreements.is2day;
    const isWeek = notificationsAgreements.isWeek;
    const isMonth = notificationsAgreements.isMonth;
    const isYear = notificationsAgreements.isYear;
    const isYearly = notificationsAgreements.isYearly;
    
    requestNotificationPermissions();
    
    if (Platform.OS === 'web') {
        console.log('Уведомления недоступны в Web') 
    }
    else {
        const currentDate = Date.now();
        const daysLeft = Math.ceil((holidayDate - currentDate) / 1000 / 60 / 60 / 24);
        let notificationDate = new Date(holidayDate);

        if(isYearly) {
            if(is1day) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24);
                id1day = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события остался 1 день!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.YEARLY,
                        month: notificationDate.getMonth(),
                        day: notificationDate.getDate(),
                        hour: 0,
                        minute: 0
                    },
                });
            }
            if(is2day) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 2);
                id2day = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события осталось 2 дня!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.YEARLY,
                        month: notificationDate.getMonth(),
                        day: notificationDate.getDate(),
                        hour: 0,
                        minute: 0
                    },
                });
            }
            if(isWeek) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 7);
                idWeek = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события осталась неделя!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.YEARLY,
                        month: notificationDate.getMonth(),
                        day: notificationDate.getDate(),
                        hour: 0,
                        minute: 0
                    },
                });
            }
            if(isMonth) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 30);
                idMonth = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события остался месяц!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.YEARLY,
                        month: notificationDate.getMonth(),
                        day: notificationDate.getDate(),
                        hour: 0,
                        minute: 0
                    },
                });
            }
            if(isYear) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 365);
                idYear = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события остался год!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.YEARLY,
                        month: notificationDate.getMonth(),
                        day: notificationDate.getDate(),
                        hour: 0,
                        minute: 0
                    },
                });
            }
        }
        else {
            if(is1day && daysLeft > 1) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24);
                id1day = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события остался 1 день!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.DATE,
                        date: notificationDate
                    },
                });
            }
            if(is2day && daysLeft > 2) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 2);
                id2day = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события осталось 2 дня!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.DATE,
                        date: notificationDate
                    },
                });
            }
            if(isWeek && daysLeft > 7) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 7);
                idWeek = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события осталась неделя!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.DATE,
                        date: notificationDate
                    },
                });
            }
            if(isMonth && daysLeft > 30) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 30);
                idMonth = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события остался месяц!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.DATE,
                        date: notificationDate
                    },
                });
            }
            if(isYear && daysLeft > 365) {
                notificationDate = new Date(holidayDate - 1000 * 60 * 60 * 24 * 365);
                idYear = await Notifications.scheduleNotificationAsync({
                    content: {
                        vibrate: [0, 250, 250],
                        title: title,
                        body: 'До события остался год!',
                    },
                    trigger: {
                        type: SchedulableTriggerInputTypes.DATE,
                        date: notificationDate
                    },
                });
            }
        }
    };

    return {id1day: id1day, id2day: id2day, idWeek: idWeek, idMonth: idMonth, idYear: idYear, isYearly: isYearly}
};

export const deleteNotifications = async (notifications: { id1day: string, id2day: string, idWeek: string, idMonth: string, idYear: string, isYearly: boolean }) => {
    if (Platform.OS === 'web') {
        console.log('Уведомления недоступны в Web') 
    }
    else {
        notifications.id1day && await Notifications.cancelScheduledNotificationAsync(notifications.id1day);
        notifications.id2day && await Notifications.cancelScheduledNotificationAsync(notifications.id2day);
        notifications.idWeek && await Notifications.cancelScheduledNotificationAsync(notifications.idWeek);
        notifications.idMonth && await Notifications.cancelScheduledNotificationAsync(notifications.idMonth);
        notifications.idYear && await Notifications.cancelScheduledNotificationAsync(notifications.idYear);
    }
}