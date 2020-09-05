import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text,ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
import { Header, ListItem, Avatar, Button } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter, logout } from '../../store/actions/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps'

const Details = (props) => {
    const [loading, setLoader] = useState(false);
    const [state, setState] = useState({
        isMapReady: false,
        LATITUDE_DELTA: 0.009,
        LONGITUDE_DELTA: 0.009,
    });


    const details = props.route.params ? props.route.params.details : null;
    console.log('======>Details',details);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1500)
    }, [])
    const navigate = () => {
        props.navigation.push('Ambulance')
    }


    const onMapLayout = () => {
        setState({ ...state, isMapReady: true });
    }


    const _pressCall = (phone) => {
        let url = '';
        if (Platform.OS === 'ios') {
            url = `tel://${phone}`;
        } else if (Platform.OS === 'android') {
            url = `tel:${phone}`;
        }
        Linking.openURL(url)
    }
    return (
        <View style={styles.formView}>
            <Header
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.leftComponentView}>
                    <AntIcon name='arrowleft' color='white' style={styles.backArrow} />
                </TouchableOpacity>}
                centerComponent={{ text: 'Details', style: styles.titleStye }}
                containerStyle={styles.headerContainer}
            />
            {
                loading ?
                    <ActivityIndicator color='#01C397' size='large' style={{ flex: 1 }} />
                    :

                    <ScrollView>
                        <Text style={styles.hospitalName}>{details ? details.name : ''}</Text>
                        <View style={styles.listView}>
                            <Text style={styles.listText}>No. of Beds :</Text>
                            <Text style={styles.listText}>{details ? details.bed : ''}</Text>
                        </View>
                        <View style={styles.listView}>
                            <Text style={styles.listText}>No. of Ventilators :</Text>
                            <Text style={styles.listText}>{details ? details.ventilator : ''}</Text>
                        </View>
                        <View style={styles.listView}>
                            <Text style={styles.listText}>Estimated Distance :</Text>
                            <Text style={styles.listText}>{details ? details.distance : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10 }}>
                            <Text style={[styles.listText, { marginTop: 10 }]}>Contact : {details ? details.phone : ''}</Text>
                            <TouchableOpacity style={styles.callIconContainer} onPress={() => _pressCall(details.phone)}>
                                <FeatherIcon style={styles.callIcon} name='phone-call' />
                            </TouchableOpacity>
                        </View>
                        <View>
                            < MapView
                                style={styles.mapStyle}
                                region={
                                    {
                                        latitude: details ? details.lat : 0,
                                        longitude: details ? details.lng : 0,

                                        latitudeDelta: state.LATITUDE_DELTA,
                                        longitudeDelta: state.LONGITUDE_DELTA,
                                    }
                                }
                                onLayout={() => { onMapLayout() }}
                            >
                                <MapView.Marker
                                    coordinate={
                                        {
                                            latitude: details ? details.lat : 0,
                                            longitude: details ? details.lng : 0,
                                        }
                                    }
                                />
                            </MapView >
                            <View>
                                <Button
                                    onPress={() => navigate()}
                                    buttonStyle={{ backgroundColor: '#01C397' }}
                                    icon={
                                        <FontIcon
                                            name="ambulance"
                                            size={25}
                                            color="white"
                                            style={{ marginRight: 10 }}
                                        />
                                    }
                                    title="Call Ambulance"
                                />
                            </View>
                        </View>
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

export default connect(mapStateToProp, mapDispatchToProp)(Details);

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
    },
    titleStye: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
    leftComponentView: {
        alignItems: 'center',
        width: '100%'
    },
    backArrow: {
        fontSize: 30,
        alignSelf: 'flex-start'
    },
    hospitalName: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        color: '#01C397',
        textDecorationLine: 'underline'
    },
    listView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    listText: {
        fontSize: 17,
        color: '#01C397'
    },
    callIcon: {
        fontSize: 20,
        color: '#01C397'
    },
    callIconContainer: {
        marginRight: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 45,
        borderColor: '#01C397'
    },
    mapStyle: {
        height: 350,
        width: 380,
        borderColor: '#F6820D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 20
    },
});