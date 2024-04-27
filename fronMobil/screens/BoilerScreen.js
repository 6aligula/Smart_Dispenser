// Importaciones React-Native y React essentials:
import { View, Text, Button, StyleSheet } from "react-native"; // Importa los componentes básicos de la interfaz de usuario.
import styles from "./styles/GastosStyle"; // Importa estilos personalizados desde GastosStyle.
import axios from "axios";
import Config from 'react-native-config';
import { useState } from "react";

// Aquí definimos el componente BoilerScreen, un lugar para hacer cambios mágicos:
const BoilerScreen = ({ navigation }) => {
    const API_URL = Config.API_URL;
    const [seconds, setSeconds] = useState(1); // Estado para guardar los segundos seleccionados
    const [message, setMessage] = useState(''); // Estado para guardar el mensaje del servidor

    // Función para enviar comando a la calefacción
    const sendBoilerCommand = (seconds) => {
        if (seconds > 0) {
            const url = `${API_URL}/dispensar/encender?seconds=${seconds}`;
            axios.post(url)
                .then(response => {
                    console.log("Respuesta del servidor: ", response.data);
                    if (response.data.success) {
                        setMessage(response.data.message);
                        console.log("Dispensador encendido por ", seconds, " segundos", "mensaje del servidor: ", response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error en la petición:', error);
                    setMessage('Error en la petición', error);
                });
        } else {
            setMessage('Dosis invalida, no puede ser 0');
        }

    }

    // Incrementa los segundos
    const incrementSeconds = () => {
        setSeconds(prevSeconds => prevSeconds + 1);
    }

    // Decrementa los segundos
    const decrementSeconds = () => {
        setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
    }

    return (
        <View style={styles.safeAreaContainer}>
            <Text style={styles.title}>Control de la dosis</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                <Button
                    title="-"
                    onPress={decrementSeconds}
                    style={styles.button}
                />
                <Text style={styles.subtitle}>{seconds} dosis</Text>
                <Button
                    title="+"
                    onPress={incrementSeconds}
                    style={styles.button}
                />
            </View>
            <Button
                title="Medicar"
                onPress={() => sendBoilerCommand(seconds)}
            />
            <Text style={styles.subtitle}>{message}</Text>
        </View>
    );
}

export default BoilerScreen;
