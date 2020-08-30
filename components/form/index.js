import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Heading from '../../components/heading';
import TextField from '../../components/Textfield';
import PasswordTextField from '../../components/PasswordTextfield';

export default function Form() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.formView}>
            <Heading title={'Forms'} />
            <TextField password={false} value={email} title={'Lorem ipsum'} onChange={(text) => setEmail(text)} />
            <TextField password={false} value={username} title={'Lorem ipsum'} onChange={(text) => setUsername(text)} />
            <PasswordTextField password={true} value={password} title={'Lorem ipsum'} onChange={(text) => setPassword(text)} />
        </View>
    );
}
const styles = StyleSheet.create({
    formView: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    }
});