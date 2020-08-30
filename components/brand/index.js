import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Heading from '../../components/heading';
import Logo1 from '../../assets/xeool-brand.png';
import Logo2 from '../../assets/xeool-brand1.png';

export default function Brand() {
    return (
        <View style={styles.brandView}>
            <Heading title={'Brand'} />
            <View style={styles.brandTextView}>
                <View style={styles.brandView1}>
                    <Image style={{ width: 111, height: 25 }} source={Logo1} />
                    {/* <Text style={styles.brandText1}>{'XEOOL'}</Text> */}
                </View>
                <View style={styles.brandView2}>
                    <Image style={{ width: 111, height: 25 }} source={Logo2} />
                    {/* <Text style={styles.brandText2}>{'XEOOL'}</Text> */}
                </View>
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
    brandTextView: {
        flexDirection: 'row'
    },
    brandView1: {
        paddingRight: 18,
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    brandView2: {
        width: 140,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01c397',
    },
    // brandText1: {
    //     fontSize: 25,
    //     fontWeight: 'bold',
    //     paddingVertical: 5,
    //     paddingRight: 20,
    //     backgroundColor: '#FFF',
    //     color: '#01c397'
    // },
    // brandText2: {
    //     fontSize: 25,
    //     fontWeight: 'bold',
    //     paddingHorizontal: 15,
    //     paddingVertical: 5,
    //     backgroundColor: '#01c397',
    //     color: '#FFF'
    // }
});