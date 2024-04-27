import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Cambiado a 'space-between'
        height: 160,
        backgroundColor: '#007dffff',
        paddingHorizontal: 10, // Añadido para dar un margen a ambos lados
    },
    backButton: {
        paddingRight: 10, // Cambiado a paddingRight para que el botón tenga margen interno a la derecha
    },
    rightButtons: {
        flexDirection: 'row', // Añadido para que los íconos estén en fila
    },
    loginButton: {
        marginRight: 10, // Añadido para separar los íconos
    },
    notificationsButton: {
        paddingLeft: 10, // Cambiado a paddingLeft para que el botón tenga margen interno a la izquierda
    },
    cartItemCountContainer: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItemCount: {
        color: 'white',
        fontWeight: 'bold',
    },
    iconButtonContainer: {
        alignItems: 'center', // Centrar verticalmente
        //marginTop: 15, 
    },
    textButton: {
        marginTop: 30, // Espacio entre el ícono y el botón de texto
    },

});

export default styles;