import { Button, View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles/HomeStyle";
import portada from '../images/home.png';
import DateSelector from "../components/DateSelector";
import axios from "axios";
import Config from 'react-native-config';
import moment from "moment";

// Definimos nuestro componente HomeScreen, ¡la puerta de entrada a nuestra app!
const HomeScreen = ({ navigation }) => {
    const API_URL_BOILER = Config.API_URL_BOILER;
    // Estado para almacenar los datos de la respuesta del backend.
    const [backendData, setBackendData] = useState(null);
    // Estado para manejar la carga y los errores.
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });

    // Función para manejar las fechas seleccionadas en el calendario.
    const fetchData = (startDate, endDate) => {

        if (!selectedDates.startDate || !selectedDates.endDate) {
            console.log("Fechas no seleccionadas.");
            return; // No hacer nada si no hay fechas seleccionadas
        }
        // Formatea las fechas como lo requiera tu backend.
        const formattedStartDate = moment(startDate).format("DD/MM/YYYY");
        const formattedEndDate = moment(endDate).format("DD/MM/YYYY");

        // Aquí colocamos el console.log para ver los parámetros de la petición
        console.log("Enviando petición a:", `${API_URL_BOILER}/tiempo-calefaccion`);
        console.log("Parámetros de la petición:", { start_date: formattedStartDate, end_date: formattedEndDate });


        setIsLoading(true);
        setError(null); // Resetea el error antes de cada llamada.

        // Llamada al backend con axios.
        axios.get(`${API_URL_BOILER}/tiempo-calefaccion`, {
            params: {
                start_date: formattedStartDate,
                end_date: formattedEndDate
            }
        })
            .then(response => {
                setBackendData(response.data); // Actualiza los datos del backend
                console.log("respuesta de accion enviada", response.data);
                setIsLoading(false); // Termina la carga
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setError(error); // Guarda el error en el estado
                setIsLoading(false); // Termina la carga
            });
    };

    useEffect(() => {
        fetchData();
    }, [selectedDates]); // Dependencias del useEffect

    const handleDateChange = (dateString) => {
        console.log("Fecha seleccionada:", dateString);
        // Actualiza el estado de las fechas seleccionadas
        if (!selectedDates.startDate) {
            setSelectedDates({ ...selectedDates, startDate: dateString });
        } else {
            setSelectedDates({ ...selectedDates, endDate: dateString });
            // Llama a fetchData aquí si quieres cargar los datos inmediatamente después de seleccionar la fecha final
            fetchData(dateString, selectedDates.startDate);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Aplicación para controlar mi calefacción</Text>
                    <DateSelector onDatesChange={handleDateChange} />
                    <Button title="Cargar Datos" onPress={fetchData} disabled={isLoading} />
                    {isLoading && <Text>Cargando...</Text>}
                    {error && <Text>Error: {error.message}</Text>}
                    {backendData && (
                        <View>
                            <Text style={styles.title}>Intervalos de Encendido:</Text>
                            {backendData.intervalos_encendido.map((interval, index) => (
                                <Text key={index}>
                                    Inicio: {interval.inicio} - Fin: {interval.fin}
                                </Text>
                            ))}
                            <Text style={styles.subtitle}>Tiempo Total Encendido: {backendData.tiempo_total_encendido}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default HomeScreen;
