import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingLabelTextField from './FloatInput';

export default function TextField(props) {
    return (
        <View style={{ marginVertical: 5 }}>
            <FloatingLabelTextField
                labelStyle={false}
                inputStyle={{ width: '100%', height: 35, color: '#4a4a4a', borderBottomWidth: 1, borderBottomColor: '#efefef', fontSize: 16 }}
                label={props.title}
                value={props.value}
                onChange={props.onChange}
            />
        </View>
    )
}