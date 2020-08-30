import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CancelIcon({ _OnChange }) {
    return (
        <Icon name={'ios-close-circle'} size={25} color="#aaaaaa" style={{ marginHorizontal: 10 }} onPress={() => _OnChange()} />
    );
}