import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Heading from '../../components/heading';

export default function PrimaryColors() {
    return (
        <View style={styles.colorsView}>
            <Heading title={'Primary colors'} />
            <View style={styles.colorsTextView}>
                <View style={styles.colorBox}>
                    <View style={[styles.colorView, { backgroundColor: '#AFAFAF' }]} />
                    <Text style={styles.text}>{'#AFAFAF'}</Text>
                </View>
                <View style={[styles.colorBox, { paddingHorizontal: 40 }]}>
                    <View style={[styles.colorView, { backgroundColor: '#4A4A4A' }]} />
                    <Text style={styles.text}>{'#4A4A4A'}</Text>
                </View>
                <View style={styles.colorBox}>
                    <View style={[styles.colorView, { backgroundColor: '#01C397' }]} />
                    <Text style={styles.text}>{'#01C397'}</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    colorsView: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    colorsTextView: {
        flexDirection: 'row'
    },
    colorBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    text: {
        fontSize: 15,
        paddingVertical: 10,
        color: '#4a4a4a'
    },
    colorView: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
    }
});