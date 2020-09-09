import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Heading from '../../components/heading';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter, authChange } from '../../store/actions/auth';
import TextField from '../../components/Textfield';
import PasswordTextField from '../../components/PasswordTextfield';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Logo2 from '../../assets/EHL.png';
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../../config';

const { width } = Dimensions.get('window');

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [screenLoader, setScreenLoader] = useState(false);
    useEffect(() => {
        setScreenLoader(true);
        props.actions.authChangeUser('Hello')
            .then(async() => {
        setScreenLoader(false);
                props.navigation.navigate('Home');
            })
            .catch(() => {
                setScreenLoader(false);
                // props.navigation.navigate('Auth');
            })
    }, [])
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    const _signin = () => {
        if (email && password) {
            let isEmailVerified = ValidateEmail(email);
            if (isEmailVerified) {
                setLoader(true);
                props.actions._login({ email, password })
                    .then(async() => {
                        await props.actions._viewCounter();
                        setLoader(false);
                        props.navigation.navigate('Home');
                        setEmail('');
                        setPassword('');
                    })
                    .catch((err) => {
                        setLoader(false);
                        alert(err);
                    })
            }
        }
    }
    return (
        screenLoader ? <ActivityIndicator color='#01C397' size='large' style={{ flex: 1 }} />
            :
            <View style={styles.formView}>
                <View style={styles.brandView2}>
                    <FIcon name='hospital-o' style={styles.hospitalIcon} />
                    <Image style={{ width: 150, height: 50 }} source={Logo2} />
                    <Text style={[styles.buttonsText, { fontWeight: 'bold', fontSize: 16 }]}>Emergency Hospital Locator</Text>
                </View>
                <View style={{ marginTop: 40, width: width - 26, marginHorizontal: 13 }}>
                    <TextField password={false} value={email} title={'Email'} onChange={(text) => setEmail(text)} />
                    <PasswordTextField password={true} value={password} title={'Password'} onChange={(text) => setPassword(text)} />
                    <TouchableOpacity
                        onPress={_signin}
                        disabled={!email || !password || (password && password.length < 8) || loader ? true : false}
                        style={[styles.buttonOpacity, { backgroundColor: email && password && (password && password.length >= 8) ? "#01c397" : "#E5E5E5" }]}
                    >
                        {
                            !loader ?
                                <Text style={[styles.buttonsText, { fontSize: 16, color: '#FFF', fontWeight: 'bold', marginVertical: 8 }]}>{"Login"}</Text>
                                :
                                <ActivityIndicator size={'large'} color={'#FFF'} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Signup')}
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}
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
            </View>
    );
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators({
            _login: (recUser) => login(recUser),
            _viewCounter: () => viewCounter(),
            authChangeUser: (recUser) => authChange(recUser),
        }, dispatch)
    }
}

export default connect(null, mapDispatchToProp)(Signin);

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
    brandView2: {
        width: '100%',
        height: 75,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hospitalIcon: {
        fontSize: 40,
        color: '#01C397'
    }
});