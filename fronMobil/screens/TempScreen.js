// Importaciones de React y React Native para sazonar nuestra app:
import { useState, useEffect } from "react"; // El useState, para mantener las cosas frescas y actualizadas.
import { Button, View, Text } from "react-native"; // Los ingredientes básicos de la interfaz de usuario.
import styles from "./styles/AddStyle"; // Traemos los estilos desde AddStyle para que todo se vea apetitoso.
import axios from "axios";
import GraficoTemperaturaHumedad from "../components/GraficoTemperaturaHumedad";
import { SafeAreaView } from "react-native-safe-area-context";
import Config from 'react-native-config';


const TempScreen = ({ navigation }) => {
    const apiURL = Config.API_URL;
    const [temperatura, setTemperatura] = useState(null);
    const [ultimas_temperaturas, setUltimasTemperaturas] = useState(null);
    const [tempEror, setTempError] = useState(null);
    const [mediana, setMediana] = useState(null);
    const [humedad, setHumedad] = useState(null);
    const [timestamp, setTimestamp] = useState("");
    const [sensacionTermica, setSensacionTermica] = useState(null);
    const cargandoDatos = "Cargando datos..."

    function celsiusAFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    function calcularSensacionTermicaCelsius(temperaturaCelsius, humedad) {
        let temperaturaFahrenheit = celsiusAFahrenheit(temperaturaCelsius);
        let stFahrenheit = -42.379 + 2.04901523 * temperaturaFahrenheit + 10.14333127 * humedad
            - 0.22475541 * temperaturaFahrenheit * humedad
            - 6.83783 * Math.pow(10, -3) * Math.pow(temperaturaFahrenheit, 2)
            - 5.481717 * Math.pow(10, -2) * Math.pow(humedad, 2)
            + 1.22874 * Math.pow(10, -3) * Math.pow(temperaturaFahrenheit, 2) * humedad
            + 8.5282 * Math.pow(10, -4) * temperaturaFahrenheit * Math.pow(humedad, 2)
            - 1.99 * Math.pow(10, -6) * Math.pow(temperaturaFahrenheit, 2) * Math.pow(humedad, 2);

        // Convertir la sensación térmica de vuelta a Celsius
        setSensacionTermica(parseFloat(((stFahrenheit - 32) * 5 / 9).toFixed(2)));
    }
    // Función para obtener la temperatura desde el backend.
    const fetchTemperatura = async () => {
        try {
            const response = await axios.get(`${apiURL}/temperatura`);
            const data = response.data;
            //console.log(Config.API_URL)
            if (data.ultimas_temperaturas[0] < 12) {
                setTempError(data.ultimas_temperaturas[0]);
                setTemperatura(data.mediana - 5);
                //console.log("if 1")
            }else{
                setTemperatura(data.ultimas_temperaturas[0]);
                //setHumedad(response.data.humedad + 20);
                setMediana(data.mediana);
                setTempError(0);
                //console.log("else 2")
            }
            setUltimasTemperaturas(data.ultimas_temperaturas);
            setHumedad(data.humedad);
            setTimestamp(data.timestamp);
            //console.log(timestamp)
            calcularSensacionTermicaCelsius(temperatura, humedad);
            //console.log("Datos de temperatura recibidos 3:", data);
        } catch (error) {
            setTemperatura(error);
            //console.error("Error al obtener la temperatura:", error);
        }
    };
    // Usamos useEffect para cargar los datos al iniciar el componente.
    useEffect(() => {
        fetchTemperatura();
        //console.log(temperatura)
        calcularSensacionTermicaCelsius(temperatura, humedad);
    }, []); // El array vacío asegura que la función se ejecute solo una vez al montar el componente.


    // El montaje de los componentes de nuestra interfaz:
    return (
        <SafeAreaView>
            <View >
                <Text style={styles.title}>Temperatura de la Caleta</Text>
                {ultimas_temperaturas !== null && timestamp !== null &&
                    <GraficoTemperaturaHumedad temperatura={ultimas_temperaturas} timestamp={timestamp} />
                }
                <Text style={styles.title}>{temperatura ? `Ultima lectura: ${temperatura}°C` : cargandoDatos}</Text>
                <Text style={styles.title}>{humedad ? `Humedad actual: ${humedad}%` : cargandoDatos}</Text>
                <Text style={styles.subtitle}>{mediana ? `Mediana: ${mediana}` : cargandoDatos}</Text>
                <Text style={styles.subtitle}>{sensacionTermica ? `Sensación Térmica: ${sensacionTermica}` : cargandoDatos}</Text>
                <Text style={styles.subtitle}>{tempEror ? `Error de lectura: ${tempEror}` : 'Lectura correcta'}</Text>
                <Button title="Actualizar Temperatura" onPress={fetchTemperatura} />
            </View>
        </SafeAreaView>

    );
}
export default TempScreen;