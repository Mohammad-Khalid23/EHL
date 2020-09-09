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
import { hospitals, zones } from '../../hospital';

const Hospitals = (props) => {
    // console.log('props==>', props.navigation);
    const [state, setState] = useState({
        search: '',
        filteredHospitals: [],
        seletedHospital: '',
        filteredZone: []
    });
    const [loading, setLoader] = useState(false);
    const [showZone, setShowZone] = useState(false);
    const [showHospital, setShowHospital] = useState(false);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1500);
    }, []);

    const sortList = (list) => {
        const sortedList = list.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (b.name> a.name) {
                return 1;
            }
            return 0;
        });
        return sortedList;
    }

    const filterZone = (text) => {
        console.log('tetx', text)
        const myList = zones.filter(randomSearch)
        console.log("My list ---->",myList);
        setShowZone(true)
        if (text) {
            let filteredZone = zones.filter(data => {
                // if (data.toLowerCase().includes(text.toLowerCase()) === true) return data;
                return data.toLowerCase().startsWith(text.toLowerCase())
            });
            filteredZone = filteredZone.sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (b > a) {
                    return 1;
                }
                return 0;
            });
            setState({ ...state, filteredZone, search: text })
            console.log('filter zone', filteredZone);
        } else {
            setState({ ...state, search: text, filteredZone: [] })
        }
    }

    const selectZone = (text) => {
        console.log('=>', text);
        setState({ ...state, seletedHospital: text });
        searchHospital(text);
    }

    const searchHospital = (seletedHospital) => {
        console.log('Hospitals_List', seletedHospital)
        setLoader(true);
        setShowZone(false);
        setTimeout(() => {
            setLoader(false);
        }, 1500);
        let filteredHospitals = hospitals.filter(data => {
            if (data.tag.toLowerCase().includes(seletedHospital.toLowerCase()) === true) return data;
        });
        filteredHospitals = sortList(filteredHospitals);
        setState({ ...state, filteredHospitals })
        console.log('filter list =?', filteredHospitals);
    }
    const navigate = (data) => {
        console.log("selected Hospitals", data);
        props.navigation.push('Details', { details: data })
    }

    const randomSearch = (zone) => {
        return zone.search(state.search) >= 0 || zone.search((state.search).toLowerCase) >= 0;
    }

    // const list = state.filteredHospitals.length > 0 ? state.filteredHospitals : sortList(hospitals);
    const list = state.filteredHospitals;

    return (
        <View style={styles.formView}>
            <Header
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.leftComponentView}>
                    <AntIcon name='arrowleft' color='white' style={styles.backArrow} />
                </TouchableOpacity>}
                centerComponent={{ text: 'Hospitals', style: styles.titleStye }}
                containerStyle={styles.headerContainer}
            />
            {/* <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                <SearchBar
                    placeholder="Type Location here..."
                    // onChangeText={(text) => setState({ ...state, search: text })}
                    onChangeText={(text) => filterZone(text)}
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
            </View> */}
            <SearchBar
                placeholder="Type Location here..."
                // onChangeText={(text) => setState({ ...state, search: text })}
                onChangeText={(text) => filterZone(text)}
                value={state.seletedHospital ? state.seletedHospital : state.search}
                onClear={() => setState({ ...state, search: '', filteredHospitals: [], filteredZone: [] })}
                inputContainerStyle={{ backgroundColor: '#2d3436' }}
                // onSubmitEditing={() => filterZone(text)}
                inputStyle={{ color: '#01C397' }}
                containerStyle={{ backgroundColor: '#2d3436', borderColor: 'red', padding: 0, borderRadius: 0 }}
            />
            {
                showZone &&
                <ScrollView>
                    {state.filteredZone.map((l, i) => (
                        <TouchableOpacity onPress={() => selectZone(l)} key={i} style={styles.listItem}>
                            <View style={{ flexDirection: 'row' }}>
                                <SimpleIcon name='location-pin' style={styles.hospitalIcon} />
                                <Text style={styles.listTitle}>{l}</Text>
                            </View>
                            <SimpleIcon name='arrow-right' style={styles.arrowIcon} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            }
            {
                (loading && showHospital) ?
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