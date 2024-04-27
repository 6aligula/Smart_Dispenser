import React from 'react'; // Importa React, el ingrediente principal de nuestra app.
import { NavigationContainer } from '@react-navigation/native'; // Importa NavigationContainer para manejar la navegación.
import { createStackNavigator } from '@react-navigation/stack'; // Importa createStackNavigator para crear una pila de navegación.
import { HomeScreen, TempScreen, BoilerScreen, EliminarScreen, MostrarScreen } from './screens'; // Importa todas nuestras pantallas desde el directorio screens.
import CustomHeader from './components/CustomHeader'; // Trae el CustomHeader para darle estilo a la cabecera.

const Stack = createStackNavigator(); // Crea una nueva pila de navegación.

const App = () => {
  return (
    <NavigationContainer>
      {/* NavigationContainer envuelve toda la navegación de la app. */}
      <Stack.Navigator>
        {/* Stack.Navigator define cómo navegamos entre pantallas. */}
        {/* A continuación, definimos cada pantalla de nuestra app y su configuración: */}
        <Stack.Screen
          name="HomeScreen" // Nombre de la ruta para la pantalla de inicio.
          component={HomeScreen} // El componente que se muestra en esta pantalla.
          options={({ navigation }) => ({
            header: () => <CustomHeader locationHome={true} navigation={navigation} />, // Configura el encabezado personalizado.
          })}
        />
        {/* Repetimos el proceso para las demás pantallas: */}
        <Stack.Screen
          name="TempScreen"
          component={TempScreen}
          options={({ navigation }) => ({
            header: () => <CustomHeader locationHome={true} navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="BoilerScreen"
          component={BoilerScreen}
          options={({ navigation }) => ({
            header: () => <CustomHeader locationHome={true} navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="EliminarScreen"
          component={EliminarScreen}
          options={({ navigation }) => ({
            header: () => <CustomHeader locationHome={true} navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="MostrarScreen"
          component={MostrarScreen}
          options={({ navigation }) => ({
            header: () => <CustomHeader locationHome={true} navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App; // Exporta la app para que el mundo pueda disfrutarla.