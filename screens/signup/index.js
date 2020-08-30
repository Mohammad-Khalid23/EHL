import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import RoundCheckbox from 'rn-round-checkbox';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { register, viewCounter } from '../../store/actions/auth';
import Heading from '../../components/heading';
import TextField from '../../components/Textfield';
import PasswordTextField from '../../components/PasswordTextfield';
import Modal from "react-native-modal";
const { width, height } = Dimensions.get('window');

function Signup(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState(false);
    const [loader, setLoader] = useState(false);
    const [isSignup, setSignup] = useState(false);

    useEffect(() => {
        _getData();
    }, [])

    const _getData = () => {
        props.navigation.addListener('didFocus', () => {
            console.log('propsnavigate', props.navigation)
            const isCheck = props.navigation.getParam('check');
            if (isCheck) {
                setCheck(isCheck);
            }
        });
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    const _signup = () => {
        let isEmailVerified = ValidateEmail(email);
        if (isEmailVerified) {
            setLoader(true);
            props.actions._register({ email, password, username })
                .then(async() => {
                    setLoader(false);
                    await props.actions._viewCounter();
                    setSignup(true);
                })
                .catch((err) => {
                    setLoader(false);
                    alert(err);
                })
        }
    }

    const _Home = () => {
        props.navigation.navigate('Home');
        setUsername('');
        setEmail('');
        setPassword('');
        setCheck(false);
        setSignup(false);
    }

    return (
        <View style={styles.formView}>
            <Heading title={'Sign up'} _OnPress={() => props.navigation.navigate('Auth')} />
            <View style={{ marginTop: 15, width: width - 26, marginHorizontal: 13 }}>
                <TextField password={false} value={username} title={'Name'} onChange={(text) => setUsername(text)} />
                <TextField password={false} value={email} title={'Email'} onChange={(text) => setEmail(text)} />
                <PasswordTextField password={true} value={password} title={'Password'} onChange={(text) => setPassword(text)} />
                <View>
                    <Text style={{ fontSize: 12, color: '#4a4a4a', marginVertical: 2 }}>{"Must contain 8 character or more"}</Text>
                </View>
                <TouchableOpacity
                    onPress={_signup}
                    disabled={!email || !username || !password || (password && password.length < 8) || loader ? true : false}
                    style={[styles.buttonOpacity, { backgroundColor: email && username && password && (password && password.length >= 8) ? "#01c397" : "#E5E5E5" }]}
                >
                    {
                        !loader ?
                            <Text style={[styles.buttonsText, { fontSize: 16, color: '#FFF', fontWeight: 'bold', marginVertical: 8 }]}>{"Sign up"}</Text>
                            :
                            <ActivityIndicator size={'large'} color={'#FFF'} />
                    }
                </TouchableOpacity>

                {/* <View style={{ marginTop: 5, flexDirection: 'row' }}>
                    <View style={{ width: width - 80 }}>
                        <Text style={[{ color: '#4a4a4a', fontWeight: '500', fontSize: 14 }]}>
                            Accept flaipro's terms, conditions and privacy policy.
                            View <Text style={{ color: '#01c397' }} onPress={() => props.navigation.navigate('Privacy')}>{" xeool's "}</Text> terms, conditions and private policy.
                        </Text>
                    </View>

                    <View style={{ width: 54, alignItems: 'flex-end' }}>
                        <View style={{ width: 26, height: 26, borderRadius: 26 / 2, borderWidth: 2, borderColor: check ? "#01c397" : "#E5E5E5", justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                            <RoundCheckbox
                                size={24}
                                checked={check}
                                onValueChange={(value) => setCheck(value)}
                                borderColor={"#FFFFFF"}
                                backgroundColor={'#FFFFFF'}
                                iconColor={'#01c397'}
                            />
                        </View>
                    </View>
                </View> */}
            </View>
            <Modal isVisible={isSignup}>
                <View style={{ width: '100%', height: height, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '100%', height: 200, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Congrats!</Text>
                        <Text style={{ fontSize: 18, fontWeight: '300', marginVertical: 10 }}>You have succesfully signed up!</Text>
                    </View>
                    <TouchableOpacity
                        onPress={_Home}
                        style={[styles.buttonOpacity, { width: '100%', backgroundColor: "#01c397" }]}
                    >
                        <Text style={[styles.buttonsText, { fontSize: 16, color: '#FFF', fontWeight: 'bold', marginVertical: 8 }]}>{"Continue"}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}


function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators({
            _register: (recUser) => register(recUser),
            _viewCounter: () => viewCounter(),
        }, dispatch)
    }
}

export default connect(null, mapDispatchToProp)(Signup);

const styles = StyleSheet.create({
    formView: {
        flex: 1,
        marginVertical: 18,
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    buttonOpacity: {
        height: 52,
        marginVertical: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonsText: {
        color: '#01c397',
        justifyContent: 'center'
    },
});