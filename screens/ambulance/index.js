import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, Linking, ActivityIndicator } from 'react-native';
import { Header, SearchBar, ListItem, Avatar, Button } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter, logout } from '../../store/actions/auth';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Ambulance = (props) => {
    console.log('props==>',props.navigation);
    const [loading, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1500)
    }, [])

    const ambulances = [
        {
            name:'AMAN',
            number: 1021
        },
        {
            name:'CHHIPA',
            number: 1020
        },
        {
            name:'EIDHI',
            number: 115
        },
        {
            name:'JDC',
            number: '02136341059'
        },
        {
            name:'DHA Medical Center',
            number:'02135344201'
        },
        {
            name:'New Life Nursing Medical',
            number: '03002091079'
        },
        {
            name:'Alamgir Welfare Trust',
            number:'021111153153'
        },
        {
            name:'Liaquat National Hospital',
            number: '021111111134'
        },
        {
            name:'Agh Khan University Hospital',
            number:'0213861030'
        },
        {
            name:'Saifee Hospital',
            number:'02136649866'
        }
    ];

    const sortList = (list)=>{
        const sortedList = list.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (b.name > a.name) {
                return 1;
            }
            return 0;
        });
        return sortedList;
    }

    const _pressCall = (phone) => {
        let url= '';
        if(Platform.OS === 'ios'){
            url = `tel://${phone}`;
        }else if(Platform.OS === 'android'){
            url = `tel:${phone}`;
        }
        Linking.openURL(url)
    }

    const ambulanceList = sortList(ambulances);
    return (
        <View style={styles.formView}>
            <Header
                leftComponent={<TouchableOpacity onPress={()=>props.navigation.goBack()} style={styles.leftComponentView}>
                    <AntIcon name='arrowleft' color='white' style={styles.backArrow} />
                </TouchableOpacity>}
                centerComponent={{ text: 'Ambulance', style: styles.titleStye }}
                containerStyle={styles.headerContainer}
            />
            {
                loading ?
                    <ActivityIndicator color='#01C397' size='large' style={{ flex: 1 }} />
                    :
                    <ScrollView>
                        {
                            ambulanceList.map((l, i) => (
                                <TouchableOpacity key={i} style={styles.listItem}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontIcon name='ambulance' style={styles.hospitalIcon} />
                                        <Text style={styles.listTitle}>{l.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.callIconContainer} onPress={() => _pressCall(l.number)}>
                                        <FeatherIcon style={styles.callIcon} name='phone-call' />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
            }
        </View>
    );
}

const mapDispatchToProp = (dispatch) => {
    return {
        actions: bindActionCreators({
            _login: (recUser) => login(recUser),
            _viewCounter: () => viewCounter(),
            _logout: () => logout()
        }, dispatch)
    }
}

const mapStateToProp = (state) => {
    console.log("=========> Redux state", state);
    return {
        count: state.authreducer.count
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Ambulance);

const styles = StyleSheet.create({
    formView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF'
    },
    headerContainer: {
        backgroundColor: '#01C397',
        paddingTop: 0,
        height: 60,
        justifyContent: 'space-around',
        borderBottomColor:'#2d3436'
    },
    titleStye: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
    leftComponentView: {
        alignItems: 'center',
        width: '100%'
    },
    rightComponentView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    backArrow: {
        fontSize: 30,
        alignSelf: 'flex-start'
    },
    eyeFont: {
        fontSize: 20
    },
    countText: {
        color: 'white',
        fontWeight: 'bold'
    },
    listItem: {
        borderBottomWidth: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor:'#dfe6e9'
    },
    listTitle:{
        marginLeft: 10,
        fontSize:17,
        color: '#01C397'
    },
    arrowIcon:{
        fontSize:20,
        color: '#01C397',
        marginRight:5
    },
    hospitalIcon:{
        fontSize:25,
        color: '#01C397',
        marginLeft:10
    },
    callIcon:{
        fontSize:20,
        color:'#01C397'
    },
    callIconContainer:{
        marginRight:10,
        borderWidth:1,
        padding:10,
        borderRadius:45,
        borderColor:'#01C397'
    },
});