import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },

    localStyles: {
        width: 200,
        height: 44,
        backgroundColor: '#e1e1e1', // Fondo gris claro
        color: '#5c5c5c', // Color del texto dentro del Picker
    },


});
export default styles;