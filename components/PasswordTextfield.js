import React, { useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import FloatingLabelTextField from './FloatInput';
const { width } = Dimensions.get('window');

export default function PasswordTextField(props) {
    const [isPassword, setPassword] = useState(true);

    return (
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <FloatingLabelTextField
                labelStyle={false}
                inputStyle={{ height: 35, width: (width / 2) + 45, color: '#01c397', borderBottomWidth: 1, borderBottomColor: '#efefef', fontSize: 16 }}
                label={props.title}
                value={props.value}
                onChange={props.onChange}
                password={isPassword}
            />
            <View style={{ height: 35, marginTop: 23, width: (width / 3) - 13, borderBottomWidth: 1, borderBottomColor: '#efefef', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text onPress={() => setPassword(!isPassword)} style={{ color: '#4a4a4a', fontSize: 14, textAlign: 'right' }}>{!isPassword ? 'Hide' : 'Show'}</Text>
            </View>
        </View>

    )
}