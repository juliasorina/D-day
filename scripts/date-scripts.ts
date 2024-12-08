export const getStringDaysLeft = (dateArray: string[], activeDateYear: number | string) => {
    const holidayDate = dateArray[2] == undefined ? new Date(`${activeDateYear}-${dateArray[1]}-${dateArray[0]}`) : 
    new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
    const currentDate = new Date();

    const daysLeft = Math.ceil((holidayDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);

    const lastDigit = daysLeft % 10;
    const lastTwoDigits = daysLeft % 100;
    let stringDaysLeft = '';
    
    if(daysLeft > 0) {
        if(lastTwoDigits >= 11 && lastTwoDigits <= 20) {
            stringDaysLeft = `Через ${daysLeft} дней`;
        }
        else if(lastDigit == 1) {
            stringDaysLeft = `Через ${daysLeft} день`;
        }
        else if(lastDigit >= 2 && lastDigit <= 4) {
            stringDaysLeft = `Через ${daysLeft} дня`;
        }
        else stringDaysLeft = `Через ${daysLeft} дней`;
    }

    return stringDaysLeft;
}