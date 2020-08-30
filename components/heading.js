import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';


export default function Heading({ title, _OnPress }) {
    return (
        <View style={styles.headingView}>
            <View style={{ width: `${(100 / 4)}%` }}>
                <Icon
                    name={'chevron-left'}
                    size={30}
                    color="#4a4a4a"
                    style={{ fontWeight: 'bold', marginLeft: 5 }}
                    onPress={() => _OnPress()}
                />
            </View>
            <View style={{ width: `${200 / 4}%`, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.headingText}>{title}</Text>
            </View>
            <View style={{ width: `${(100 / 4)}%` }}>

            </View>
        </View>
    );
}