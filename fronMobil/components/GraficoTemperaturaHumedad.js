import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, ActivityIndicator } from 'react-native';

const procesarTimestamp = (timestamp) => {
    const fechaHora = timestamp.split(" "); // Separas la fecha y la hora
    const horaCompleta = fechaHora[1]; // Obtienes la hora completa
    const horaMinutos = horaCompleta.substring(0, 5); // Extraes solo la hora y minutos

    return { fecha: fechaHora[0], hora: horaMinutos };
};


const GraficoTemperaturaHumedad = ({ temperatura, timestamp }) => {
    // Verifica si los datos están cargando
    const isLoading = !temperatura || !timestamp || !Array.isArray(timestamp) || !Array.isArray(temperatura);

    // Si los datos están cargando, muestra el ActivityIndicator
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Procesa los timestamps para usarlos como etiquetas
    const labels = timestamp.map(ts => {
        const { hora } = procesarTimestamp(ts);
        return hora;
    });

    //console.log(timestamp)
    console.log(labels)
    const screenWidth = Dimensions.get('window').width;
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: temperatura
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 2, // opcional, número de decimales en el texto del gráfico
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // función que devuelve un color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // color de las etiquetas

    };

    return (
        <View >
            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
            />
        </View>

    );
};

export default GraficoTemperaturaHumedad;
