import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Header, SearchBar, ListItem, Avatar, Button } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter, logout } from '../../store/actions/auth';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import * as Location from 'expo-location';
import { hospitals } from '../../hospital';

const Hospitals = (props) => {
    console.log('props==>', props.navigation);
    const [state, setState] = useState({
        search: '',
        filteredHospitals: []
    });
    const [loading, setLoader] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1500);
        // (async () => {
        //     let { status } = await Location.requestPermissionsAsync();
        //     if (status !== 'granted') {
        //         setErrorMsg('Permission to access location was denied');
        //     }

        //     let location = await Location.getCurrentPositionAsync({});
        //     setLocation(location);
        // })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        console.log("=Location", location.coords);
        text = JSON.stringify(location);
    }


    function closestLocation(targetLocation, locationData) {
        function vectorDistance(dx, dy) {
            return Math.sqrt(dx * dx + dy * dy);
        }

        function locationDistance(location1, location2) {
            var dx = location1.latitude - location2.latitude,
                dy = location1.longitude - location2.longitude;

            return vectorDistance(dx, dy);
        }

        return locationData.reduce(function (prev, curr) {
            var prevDistance = locationDistance(targetLocation, prev),
                currDistance = locationDistance(targetLocation, curr);
            return (prevDistance < currDistance) ? prev : curr;
        });
    }

    // var data = {
    //     "Locations": {
    //         "Location": [
    //             {
    //             "id": "3066",
    //             "latitude": "57.6494",
    //             "longitude": "-3.5606",
    //             "name": "Kinloss"},
    //         {
    //             "id": "3080",
    //             "latitude": "57.077",
    //             "longitude": "-2.836",
    //             "name": "Aboyne"},
    //         {
    //             "id": "3091",
    //             "latitude": "57.206",
    //             "longitude": "-2.202",
    //             "name": "Aberdeen Dyce"},
    //         {
    //             "id": "3134",
    //             "latitude": "55.907",
    //             "longitude": "-4.533",
    //             "name": "Glasgow/Bishopton"},
    //         {
    //             "id": "3136",
    //             "latitude": "55.515",
    //             "longitude": "-4.585",
    //             "name": "Prestwick Rnas"},
    //         {
    //             "id": "3144",
    //             "latitude": "56.326",
    //             "longitude": "-3.729",
    //             "name": "Strathallan"},
    //             {
    //                 "id": "3149",
    //                 "latitude": "24.9695181",
    //                 "longitude": "66.9628732",
    //                 "name": "My Home"},
    //                 {
    //                     "id": "3199",
    //                     "latitude": "24.9756451",
    //                     "longitude": "66.9921975",
    //                     "name": "Arkania"},
    //         ]
    //     }
    // },
    //     targetLocation = {
    //         latitude: 24.9695181,
    //         longitude: 66.9628732
    //     },
    //     closest = closestLocation(targetLocation, data.Locations.Location);
    // // closest is now the location that is closest to the target location
    // console.log('closet =========>>>>>',closest);

    const sortList = (list) => {
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

    const searchHospital = () => {
        console.log('Hospitals_List', hospitals)
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1500);
        let filteredHospitals = hospitals.filter(data => {
            if (data.tag.toLowerCase().includes(state.search.toLowerCase()) === true) return data;
        });
        filteredHospitals = sortList(filteredHospitals);
        setState({ ...state, filteredHospitals })
        console.log('filter list =?', filteredHospitals);
    }
    const navigate = (data) => {
        console.log("selected Hospitals", data);
        props.navigation.push('Details', { details: data })
    }

    const list = state.filteredHospitals.length > 0 ? state.filteredHospitals : sortList(hospitals);

    return (
        <View style={styles.formView}>
            <Header
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.leftComponentView}>
                    <AntIcon name='arrowleft' color='white' style={styles.backArrow} />
                </TouchableOpacity>}
                centerComponent={{ text: 'Hospitals', style: styles.titleStye }}
                containerStyle={styles.headerContainer}
            />
            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                <SearchBar
                    placeholder="Type Location here..."
                    onChangeText={(text) => setState({ ...state, search: text })}
                    value={state.search}
                    onClear={() => setState({ ...state, search: '', filteredHospitals: [] })}
                    inputContainerStyle={{ backgroundColor: '#2d3436' }}
                    onSubmitEditing={() => searchHospital()}
                    inputStyle={{ color: '#01C397' }}
                    containerStyle={{ width: '80%', backgroundColor: '#2d3436', borderColor: 'red', padding: 0, borderRadius: 0 }}
                />
                <Button
                    title="Search"
                    buttonStyle={{ backgroundColor: '#2d3436' }}
                    titleStyle={{ color: '#7f8c8d' }}
                    onPress={() => searchHospital()}
                    // disabled={state.search ? false : true}
                    containerStyle={{ width: '20%', backgroundColor: '#2d3436', borderRadius: 0 }}
                />
            </View>
            {
                loading ?
                    <ActivityIndicator color='#01C397' size='large' style={{ flex: 1 }} />
                    :
                    <ScrollView>
                        {list.map((l, i) => (
                            <TouchableOpacity onPress={() => navigate(l)} key={i} style={styles.listItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <FIcon name='hospital-o' style={styles.hospitalIcon} />
                                    <Text style={styles.listTitle}>{l.name}</Text>
                                </View>
                                <SimpleIcon name='arrow-right' style={styles.arrowIcon} />
                            </TouchableOpacity>
                        ))}
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

export default connect(mapStateToProp, mapDispatchToProp)(Hospitals);

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
        borderBottomColor: '#2d3436'
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
        borderBottomColor: '#dfe6e9'
    },
    listTitle: {
        marginLeft: 10,
        fontSize: 17,
        color: '#01C397'
    },
    arrowIcon: {
        fontSize: 20,
        color: '#01C397',
        marginRight: 5
    },
    hospitalIcon: {
        fontSize: 25,
        color: '#01C397',
        marginLeft: 10
    }
});