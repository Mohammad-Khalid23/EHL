import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Heading from '../../components/heading';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const XDate = require('xdate');

const { width } = Dimensions.get('window');

export default function Calendars() {
    let month = new XDate().getMonth() + 1;
    let day = new XDate().getDate();
    let year = new XDate().getFullYear();
    year = year < 10 ? `0${year}` : year;
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    let currentDate = `${year}-${month}-${day}`;
    // const [date, setDate] = useState(currentDate);
    const [date, setDate] = useState(new XDate().toDateString());
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [allDates, setAllDates] = useState({ [currentDate]: { textColor: '#01c397' } });

    const _DatePick = (day) => {
        if (startDate) {
            setAllDates({
                [currentDate]: { textColor: '#01c397' }
            })
            if (endDate) {
                setEndDate('');
                setStartDate('');
            }
            else if (new XDate(startDate).toLocaleDateString() >= new XDate(day.dateString).toLocaleDateString()) {
                setEndDate('');
                setStartDate('');
            }
            else {
                setEndDate(day.dateString);
                var dates = getDates(new XDate(startDate), new XDate(day.dateString));
                let months;
                let days;
                let years;
                let count = 0;
                let obj = { [currentDate]: { textColor: '#01c397' } };
                dates.forEach(function (date) {
                    count++
                    months = new XDate(date).getMonth() + 1;
                    days = new XDate(date).getDate();
                    years = new XDate(date).getFullYear();
                    years = years < 10 ? `0${years}` : years;
                    months = months < 10 ? `0${months}` : months;
                    days = days < 10 ? `0${days}` : days;
                    obj = {
                        ...obj,
                        [`${years}-${months}-${days}`]: { startingDay: count == 1 ? true : false, selected: true, color: '#01c397', endingDay: count == dates.length ? true : false }
                    }
                    setAllDates({
                        ...obj
                    })
                });
            }
        }
        else {
            setStartDate(day.dateString);
            setAllDates({
                [currentDate]: { textColor: '#01c397' },
                [day.dateString]: { startingDay: true, selected: true, color: '#01c397', endingDay: true }
            })
        }
        setDate(new XDate(day.dateString).toDateString());
        console.log(day.dateString);
    }

    let getDates = function (startDate, endDate) {
        var dates = [],
            currentDate = startDate;
        let addDays = function (days) {
            var date = new XDate((this.valueOf()));
            date.setDate(date.getDate() + days);
            return date;
        };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    return (
        <View style={styles.calendarView}>
            <Heading title={'Calendar'} />
            <View style={styles.textView}>
                <Icon name={'calendar'} size={25} color="#01c397" style={{ marginHorizontal: 15 }} />
                <Text style={styles.input}>
                    {date}
                </Text>
            </View>
            <View style={{ backgroundColor: 'red' }}>
                <Calendar
                    minDate={currentDate}
                    current={date}
                    markedDates={{
                        ...allDates
                    }}
                    markingType={'period'}
                    onDayPress={(day) => _DatePick(day)}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    calendarView: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    textView: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#EFEFEF'

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,

        // elevation: 2,
    },
    input: {
        width: width - 80,
        color: '#4a4a4a',
        fontSize: 16
    }
});