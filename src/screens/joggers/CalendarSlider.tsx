/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions,  StyleSheet, View} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment, {Moment} from 'moment';

interface CustomCalendarStripProps {
  style?: any;
  onDateSelected: (date: moment.Moment) => void;
  selectedDate?: Moment | Date;
  datesBlacklist?: {start: moment.Moment; end: moment.Moment}[];
}

const {width} = Dimensions.get('window');

const CustomCalendarStrip: React.FC<CustomCalendarStripProps> = ({
  style,
  onDateSelected,
  selectedDate,
  ...restProps
}) => {
  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        calendarAnimation={{
          duration: 0,
          type: 'sequence',
        }}
        showMonth={false}
        style={[styles.calendarStrip, style]}
        dateNumberStyle={{
          ...styles.dateNameStyle,
        }}
        dateNameStyle={styles.dateNameStyle}
        highlightDateNumberStyle={styles.highlightDateStyle}
        highlightDateNameStyle={styles.highlightDateNameStyle}
        onDateSelected={onDateSelected}
        disabledDateNameStyle={{
          ...styles.highlightDateStyle,
        }}
        disabledDateNumberStyle={{
          ...styles.highlightDateStyle,
        }}
        highlightDateContainerStyle={{
          ...styles.highlightDate,
        }}
        iconLeft={null}
        iconRight={null}
        selectedDate={selectedDate}
        {...restProps}
      />
    </View>
  );
};

export default CustomCalendarStrip;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  calendarStrip: {
    height: 80,
    backgroundColor: '#c3fe34',
  },
  highlightDate: {
    margin: 0,
    width: 70,
  },
  dateNameStyle: {
    color: '#000',
    fontSize: 14,
    marginBottom: 5,
  },
  highlightDateStyle: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'rgb(0,0,0)',
    padding: 5,
    borderRadius: 20,
  },
  highlightDateNameStyle: {
    color: 'rgb(0,0,0)',
    fontSize: 14,
  },
});
