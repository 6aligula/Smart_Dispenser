import { Button, View, Text } from "react-native";
import styles from "./styles/MostrarStyle";

const MostrarScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}> Mostrar Screen</Text>
        
        </View>
    );
}
export default MostrarScreen;