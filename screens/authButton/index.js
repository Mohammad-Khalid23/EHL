import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Logo2 from '../../assets/EHL.png';

const { width } = Dimensions.get('window');

export default function AuthButtons(props) {
    return (
        <View style={styles.buttonsView}>

            <View style={styles.brandView2}>
                <Image style={{ width: 150, height: 50 }} source={Logo2} />
            <Text style={[styles.buttonsText, { fontWeight: 'bold', fontSize: 16 }]}>Emergency Hospital Locator</Text>
            </View>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Signin')}
                style={styles.buttonOpacity}
            >
                <Text style={[styles.buttonsText, { fontSize: 16, color: '#FFF', fontWeight: 'bold', marginVertical: 8 }]}>{"Login"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Signup')}
                style={{ flexDirection: 'row', marginTop: 5 }}
            >
                <Text style={[styles.buttonsText, { fontWeight: 'bold', fontSize: 16 }]}>
                    {'Create account '}
                </Text>
                <Icon
                    name={'chevron-right'}
                    size={20}
                    color="#01c397"
                    style={{ fontWeight: 'bold' }}
                />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonsView: {
        width: '100%',
        height: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    buttonOpacity: {
        width: width - 20,
        height: 52,
        marginHorizontal: 10,
        marginVertical: 18,
        backgroundColor: '#01c397',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonsText: {
        // paddingVertical: 5,
        // paddingRight: 15,
        color: '#01c397',
        justifyContent: 'center'
    },

    brandView2: {
        width: '100%',
        height: 45,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});