import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Heading from '../../components/heading';
const { width, height } = Dimensions.get('window');

export default function Privacy(props) {
    return (
        <View style={styles.formView}>
            <Heading title={'Terms and conditions'} _OnPress={() => props.navigation.navigate('Signup')} />
            <View style={styles.privacyView}>
                <ScrollView style={{}}>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                    <Text style={styles.policyText}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content
                </Text>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Signup', { check: true })}
                    style={styles.buttonOpacity}
                >
                    <Text style={[styles.buttonsText, { fontSize: 16, color: '#FFF', fontWeight: 'bold', marginVertical: 8 }]}>{"Accept"}</Text>
                </TouchableOpacity>
            </View>
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
    },
    privacyView: {
        width: width,
        height: height - 55,
        paddingHorizontal: 13,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: '#efefef'
    },
    buttonOpacity: {
        width: width - 20,
        height: 52,
        position: 'absolute',
        bottom: 0,
        marginHorizontal: 10,
        marginVertical: 18,
        backgroundColor: '#01c397',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonsText: {
        color: '#01c397',
        justifyContent: 'center'
    },
    policyText: {
        marginVertical: 7,
        color: '#4a4a4a',
        fontWeight: '500',
        lineHeight: 18
    }
});