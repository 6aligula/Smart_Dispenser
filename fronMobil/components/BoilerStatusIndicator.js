import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/BoilerIndicatorStyle';

const BoilerStatusIndicator = ({ boilerState }) => {
    const opacity = useSharedValue(boilerState === '1' ? 1 : 0);

    const sunStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const moonStyle = useAnimatedStyle(() => {
        return {
            opacity: 1 - opacity.value,
        };
    });

    React.useEffect(() => {
        opacity.value = withTiming(boilerState === '1' ? 1 : 0, {
            duration: 500,
        });
    }, [boilerState]);

    const boilerStatusText = boilerState === '1' ? 'Encendido' : 'Apagada';

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.subtitle}> La calefacción esta: {boilerStatusText}</Text>
            <Animated.View style={sunStyle}>
                <Icon name="sun-o" size={50} color="yellow" />
            </Animated.View>
            <Animated.View style={moonStyle}>
                <Icon name="moon-o" size={50} color="blue" />
            </Animated.View>
        </View>
    );
};

export default BoilerStatusIndicator;