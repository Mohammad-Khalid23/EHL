import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Header, ListItem, Avatar } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter, logout } from '../../store/actions/auth';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Home = (props) => {
    const [loading, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1500)
    }, [])

    const logout = async () => {
        await props.actions._logout();
        props.navigation.navigate('Auth');
    }

    const list = [
        {
            name: 'Ambulance',
            icon:<MIcon style={styles.hospitalIcon} name='ambulance'/>
        },
        {
            name: 'Accident',
            icon:<MaterialIcon style={styles.hospitalIcon} name='local-hospital'/>
        },
        {
            name: 'Burn Case',
            icon: <MIcon style={styles.hospitalIcon} name='fire' />
        },
        {
            name: 'Blood Bank',
            icon:<MIcon style={styles.hospitalIcon} name='blood-bag'/>
        },
        {
            name: 'Cardiac',
            icon: <FIcon style={styles.hospitalIcon} name='heartbeat' />
        },
        {
            name: 'Covid Support',
            icon:<MaterialIcon style={styles.hospitalIcon} name='local-hospital'/>
        },
        {
            name: 'Gynecology',
            icon:<MaterialIcon style={styles.hospitalIcon} name='local-hospital'/>
        },
        {
            name: 'ICU',
            icon:<MaterialIcon style={styles.hospitalIcon} name='local-hospital'/>
        },
        {
            name: 'Ventilator',
            icon:<MaterialIcon style={styles.hospitalIcon} name='local-hospital'/>
        } 
      ];

    const navigate = (data) => {
        if (data.name === 'Ambulance') {
            props.navigation.push('Ambulance')
        } else {
            props.navigation.push('Hospitals')
        }
    }
    return (
        <View style={styles.formView}>
            <Header
                leftComponent={<TouchableOpacity onPress={()=>logout()} style={styles.leftComponentView}>
                    <AntIcon name='logout' color='white' style={styles.logoutFont} />
                </TouchableOpacity>}
                centerComponent={<Text style={styles.titleStye}>Emergency Hospital Locator</Text>}
                // centerComponent={{ text: 'Emergency Hospital Locator', style: styles.titleStye }}
                rightComponent={<View style={styles.rightComponentView}>
                    <FIcon name='eye' color='white' style={styles.eyeFont} />
                    <Text style={styles.countText}>{props.count}</Text>
                </View>}
                containerStyle={styles.headerContainer}
            />
            {
                loading ?
                    <ActivityIndicator color='#01C397' size='large' style={{ flex: 1 }} />
                    :
                    <ScrollView>
                        {
                            list.map((l, i) => (
                                <TouchableOpacity onPress={() => navigate(l)} key={i} style={styles.listItem}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                        {l.icon}
                                        <Text style={styles.listTitle}>{l.name}</Text>
                                    </View>
                                    <SimpleIcon name='arrow-right' style={styles.arrowIcon} />
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

export default connect(mapStateToProp, mapDispatchToProp)(Home);

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
    titleStye: { color: '#fff', fontWeight: 'bold', fontSize: 18,textAlign:'center' },
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
    logoutFont: {
        fontSize: 20,
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
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor:'#dfe6e9'
    },
    listTitle:{
        marginLeft: 10,
        fontSize:20,
        color: '#01C397'
    },
    arrowIcon:{
        fontSize:30,
        color: '#01C397',
        marginRight:5
    },
    hospitalIcon:{
        fontSize:30,
        color: '#01C397',
    }
});