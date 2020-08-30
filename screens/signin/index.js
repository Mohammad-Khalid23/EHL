import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Heading from '../../components/heading';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter } from '../../store/actions/auth';
import TextField from '../../components/Textfield';
import PasswordTextField from '../../components/PasswordTextfield';
const { width } = Dimensions.get('window');

const Signin = (props) => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('12345678');
    const [loader, setLoader] = useState(false);

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
        <View style={styles.formView}>
            <Heading title={'Login'} _OnPress={() => props.navigation.navigate('Auth')} />
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
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    {/* <Text style={[styles.buttonsText, { fontWeight: '500', fontSize: 14 }]}>
                        {'Forgot password?'}
                    </Text> */}
                </View>
            </View>
        </View>
    );
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators({
            _login: (recUser) => login(recUser),
            _viewCounter: () => viewCounter(),
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
});