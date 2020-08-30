import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { authChange,getViews } from '../../store/actions/auth';
import Logo2 from '../../assets/EHL_white.png';

function Splash(props) {
    useEffect(() => {
        props.actions.authChangeUser('Hello')
            .then(async() => {
                await props.actions._getViews();
                props.navigation.navigate('Home');
            })
            .catch(() => {
                props.navigation.navigate('Auth');
            })
    }, [])
    return (
        <View style={styles.formView}>
            <Image style={{ width: 230, height: 60 }} source={Logo2} />
        </View>
    );
}

// function mapStateToProp(state) {
//     console.log('Run*******', state.authreducer);
//     return ({
//         currentUser: state.authreducer
//     })
// }

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators({
            authChangeUser: (recUser) => authChange(recUser),
            _getViews: () => getViews()
        }, dispatch)
    }
}

export default connect(null, mapDispatchToProp)(Splash)
const styles = StyleSheet.create({
    formView: {
        width: '100%',
        height: '100%',
        marginVertical: 18,
        backgroundColor: '#01C397',
        justifyContent: 'center',
        alignItems: 'center',
    }
});