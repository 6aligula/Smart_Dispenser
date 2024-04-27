import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

// Ejemplo de uso del Calendario Básico
const DateSelector = ({ onDatesChange }) => {
    return (
        <Calendar
            // Handler que se ejecuta al presionar una fecha
            onDayPress={(day) => {
                console.log('selected day', day);
                // Llama a onDatesChange con la fecha seleccionada
                onDatesChange(day.dateString);
            }}
            // Booleano para marcar la fecha de hoy
            markedDates={{
                '2022-05-16': { selected: true, marked: true, selectedColor: 'blue' }
            }}

            // Apariencia personalizada
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: 'blue',
                indicatorColor: 'blue',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
            }}
        />
    );
};
export default DateSelector;