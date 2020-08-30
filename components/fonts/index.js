import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Heading from '../../components/heading';

export default function Fonts() {
    return (
        <View style={styles.brandView}>
            <Heading title={'Fonts'} />
            <View>
                <Text style={[styles.brandText, {fontWeight: '0'}]}>{'Montserrat thin'}</Text>
            </View>
            <View>
                <Text style={[styles.brandText, {fontWeight:'600'}]}>{'Montserrat regular'}</Text>
            </View>
            <View>
                <Text style={[styles.brandText, {fontWeight: '900'}]}>{'Montserrat bold'}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    brandView: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    brandText: {
        fontSize: 16,
        paddingVertical: 3,
        paddingRight: 15,
        backgroundColor: '#FFF',
        // color: '#01c397'
        color: '#4A4A4A'
    }
});