import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';

export default class FloatingLabelTextField extends Component {
    state = {
        isFocused: false,
    };

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    render() {
        const { label, ...props } = this.props;
        const { isFocused } = this.state;
        const labelStyle = {
            position: 'absolute',
            top: isFocused || props.value ? 0 : 25,
            fontSize: isFocused || props.value ? 12 : 16,
            color: isFocused || props.value ? '#01c397' : '#afafaf'
        };
        return (
            <View style={{ paddingTop: 18, marginTop: 5 }}>
                <Text style={[labelStyle, props.textAlign ? { right: 0 } : { left: 0 }, label === "Show" ? { fontSize: 14 } : null]}>
                    {label}
                </Text>
                <TextInput
                    {...props}
                    style={props.inputStyle}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChangeText={(e) => props.onChange(e)}
                    selectionColor={'#01c397'}
                    secureTextEntry={props.password}
                />
            </View >
        );
    }
}
