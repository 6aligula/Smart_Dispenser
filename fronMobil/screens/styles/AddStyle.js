import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    formContainer: {
        width: 300,
        margin: 20,
        fontFamily: 'Arial',
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    input: {
        fontWeight: 'bold',
        color: '#27ae60',
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10
    },
    inputField: {
        marginBottom: 10,
        width: '100%',
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
    },
    registerLink: {
        color: 'blue',
        textDecorationLine: 'underline',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#34495e',
        textAlign: 'center',
    },
});

export default styles;
