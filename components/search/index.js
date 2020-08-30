import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import Heading from '../../components/heading';
import Icon from 'react-native-vector-icons/Feather';
import CancelIcon from '../../components/CancelIcon';
// import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

export default function Search() {
    const [sale1, setSale1] = useState('');
    const [sale2, setSale2] = useState('');
    const [sale3, setSale3] = useState('');

    return (
        <View style={styles.brandView}>
            <Heading title={'Search'} />
            <View style={styles.inputView}>
                <Icon name={'search'} size={30} color="#01c397" style={{ marginLeft: 10 }} />
                <TextInput selectionColor={'#01c397'} style={[styles.input, { width: width - 110 }]} placeholder={'Find your next sale'} value={sale1} onChangeText={(e) => setSale1(e)} />
                {sale1 ? <CancelIcon _OnChange={() => setSale1('')} /> : null}
            </View>
            <View style={styles.inputView}>
                <TextInput selectionColor={'#01c397'} style={[styles.input]} placeholder={'Find the next sale'} value={sale2} onChangeText={(e) => setSale2(e)} />
                {sale2 ? <CancelIcon _OnChange={() => setSale2('')} /> : null}
            </View>
            <View style={styles.inputView}>
                <TextInput selectionColor={'#01c397'} style={styles.input} placeholder={'Find your next sale'} value={sale3} onChangeText={(e) => setSale3(e)} />
                {sale3 ? <CancelIcon _OnChange={() => setSale3('')} /> : null}
            </View>
            <View style={styles.listView}>
                <View style={[styles.list, { borderTopWidth: 0 }]}>
                    <Icon name={'navigation'} size={25} color="#01c397" style={{ marginHorizontal: 10 }} />
                    <View style={{ flexDirection: 'row', width: width - 90 }}>
                        <Text style={{ width: '70%', textAlign: 'left', fontSize: 16, color: '#01c397' }}>Current location</Text>
                        <Text style={{ width: '30%', textAlign: 'right', fontSize: 16, color: '#01c397', paddingHorizontal: 10 }}>Cancel</Text>
                    </View>
                </View>
                <View style={styles.list}>
                    <Icon name={'map-pin'} size={30} color="#01c397" style={{ marginHorizontal: 10 }} />
                    <View style={{ flexDirection: 'row', width: width - 90 }}>
                        <Text style={{ textAlign: 'left', fontSize: 16, color: '#aaaaaa' }}><Text style={{ color: '#4a4a4a' }}>C</Text>urrent location</Text>
                    </View>
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
    inputView: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#EFEFEF'

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,

        // elevation: 2,
    },
    input: {
        height: '100%',
        width: width - 70,
        paddingHorizontal: 10,
        color: 'black',
        borderRadius: 10,
        fontSize: 16

    },
    listView: {
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 5,

        borderWidth: 1,
        borderColor: '#EFEFEF'
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,

        // elevation: 2,
    },
    list: {
        flexDirection: 'row',
        height: 52,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF'
    }
});