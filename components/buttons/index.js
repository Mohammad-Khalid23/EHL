import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Heading from '../../components/heading';

export default function Buttons() {
    return (
        <View style={styles.buttonsView}>
            <Heading title={'Buttons'} />
            <TouchableOpacity style={styles.buttonOpacity}>
                <Text style={[styles.buttonsText, { fontSize: 16, color: '#FFF', fontWeight: 'bold', marginVertical: 8 }]}>{'Primary cta'}</Text>
            </TouchableOpacity>
            <View>
                <Text style={[styles.buttonsText, { fontWeight: 'bold', fontSize: 16 }]}>{'Secondary cta >'}</Text>
            </View>
            <View>
                <Text style={[styles.buttonsText, { fontSize: 14 }]}>{'Small cta'}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonsView: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    buttonOpacity: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#01c397',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonsText: {
        paddingVertical: 5,
        paddingRight: 15,
        color: '#01c397'
    }
});