import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Heading from '../../components/heading';

export default function Content() {
    return (
        <View style={styles.contentView}>
            <Heading title={'Content'} />
            <View>
                <Text style={[styles.contentText, { fontSize: 14 }]}>{'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content'}</Text>
            </View>
            <View>
                <Text style={[styles.contentText, { fontSize: 16 }]}>{'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content'}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    contentView: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    contentText: {
        paddingVertical: 5,
        paddingRight: 15,
        color: '#4a4a4a'
    }
});