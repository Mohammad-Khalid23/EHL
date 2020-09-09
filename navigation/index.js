import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../screens/signin';
import Signup from '../screens/signup';
import Privacy from '../screens/policy';
import Splash from '../screens/splash';
import AuthButtons from '../screens/authButton';
import Hospitals from '../screens/hospitals';
import Home from '../screens/home/index';
import Details from '../screens/details/index';
import Ambulance from '../screens/ambulance';
import Tracking from '../screens/tracking';

const Stack = createStackNavigator();
const Navigation = () => {
    const option = { headerShown: false };
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Signin">
                <Stack.Screen name="Splash" component={Splash} options={option} />
                <Stack.Screen name="Auth" component={AuthButtons} options={option} />
                <Stack.Screen name="Signin" component={Signin} options={option} />
                <Stack.Screen name="Signup" component={Signup} options={option} />
                <Stack.Screen name="Privacy" component={Privacy} options={option} />
                <Stack.Screen name="Home" component={Home} options={option} />
                <Stack.Screen name="Hospitals" component={Hospitals} options={option} />
                <Stack.Screen name="Details" component={Details} options={option} />
                <Stack.Screen name="Ambulance" component={Ambulance} options={option} />
                <Stack.Screen name="Tracking" component={Tracking} options={option} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Navigation;