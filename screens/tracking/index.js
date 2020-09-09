import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions, Alert, Platform, ActivityIndicator } from 'react-native';
import { Header, ListItem, Avatar, Button } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter, logout } from '../../store/actions/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const Details = (props) => {
    const [loading, setLoader] = useState(false);

    const [counter, setCounter] = useState(0);

    let interval = null;
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
        backgroundColor: '#01C397',
        borderRadius: 5,
        height: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#01C397',
    };
    const ApproxDistance = props.route.params ? props.route.params.km : 0;
    console.log('======>ApproxDistance',ApproxDistance);

    useEffect(() => {
        interval = setInterval(() => {
            console.log('counter', counter);
            setCounter(counter => counter + 1);
            // if (counter < 100) {
            //     clearInterval(interval);
            // }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const navigate = () => {
        props.navigation.push('Ambulance')
    }

    return (
        <View style={styles.formView}>
            <Header
                leftComponent={<TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.leftComponentView}>
                    <AntIcon name='arrowleft' color='white' style={styles.backArrow} />
                </TouchableOpacity>}
                centerComponent={{ text: 'Tracking', style: styles.titleStye }}
                containerStyle={styles.headerContainer}
            />
            {
                loading ?
                    <ActivityIndicator color='#01C397' size='large' style={{ flex: 1 }} />
                    :
                    <View style={{ paddingTop: 100 }}>
                        <FontIcon name='ambulance' style={styles.hospitalIcon} />
                        <Text style={{ textAlign: 'center', fontSize: 19 }}>{counter >= 102 ? 'Your Ambulance has arrived' : 'Ambulance is on the way...'}</Text>


                        <View style={{ width: '100%', paddingLeft: 15, paddingTop: 20 }}>
                            <ProgressBarAnimated
                                {...progressCustomStyles}
                                width={barWidth}
                                value={counter}
                                backgroundColorOnComplete="#01C397"
                                onComplete={() => {
                                    // Alert.alert('Hey!', 'onComplete event fired!');
                                    clearInterval(interval);

                                }}
                            />
                        </View>
                        {
                            counter <= 100 &&
                            <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 10 }}>{`Approx. ${(ApproxDistance - (ApproxDistance * (counter / 100))).toFixed(2)}Km away`}</Text>
                        }
                        {/* <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 10 }}>{counter <= 100 ? `${counter}%` : '100%'}</Text> */}
                        {
                            counter >= 102 &&
                            <AntIcon name='checkcircleo' style={styles.checkIcon} />
                        }
                    </View>
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
    checkIcon: {
        fontSize: 100,
        marginTop: 20,
        alignSelf: 'center',
        color: '#01C397',
    },
    hospitalIcon: {
        fontSize: 100,
        color: '#01C397',
        alignSelf: 'center',
    },
});