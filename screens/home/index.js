import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Header, ListItem, Avatar } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, viewCounter, logout } from '../../store/actions/auth';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SliderBox } from "react-native-image-slider-box";

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
        },
        {
            name: 'Ambulance',
            icon:<MIcon style={styles.hospitalIcon} name='ambulance'/>
        }
      ];

      const images = [
        require('../../assets/ambulance.jpg'),
        require('../../assets/vent.jpg'),
        require('../../assets/heart.jpg'),
        require('../../assets/hospital.webp'),
        require('../../assets/covid.webp'),
        require('../../assets/blood.webp'),
      ]
    const navigate = (data) => {
        if (data.name === 'Ambulance') {
            props.navigation.push('Ambulance')
        } else {
            props.navigation.push('Hospitals')
        }
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
       <TouchableOpacity onPress={() => navigate(item)} style={styles.listItem}>
            <View style={{ flexDirection: 'column', alignItems: 'center',marginTop:15 }}>
                {item.icon}
                <Text style={styles.listTitle}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );












    // Convert Degress to Radians
    const Deg2Rad = (deg) => {
    return deg * Math.PI / 180;
  }
  
  const PythagorasEquirectangular = ( lat1, lon1, lat2, lon2 ) => {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    var y = (lat2-lat1);
    var d = Math.sqrt(x*x + y*y) * R;
    return d;
  }
  
    const NearestCity = (latitude, longitude, locations) => {
    var mindif=999999;
    var closest;
  
    for (let index = 0; index < locations.length; ++index) {
      var dif =  PythagorasEquirectangular(latitude, longitude, locations[ index ][ 1 ], locations[ index ][ 2 ]);
      if ( dif < mindif ) {
        closest=index;
        mindif = dif;
      }
    }
  
    // return the nearest location
    var closestLocation = (locations[ closest ]);
    console.log('The closest location is ' + closestLocation);
    return closestLocation;
  }

  const test = [
      ['Liaquat',24.8922332,67.0661758],
      ['AKUH',24.8935812,67.0690012],
      ['Hill',24.8740019,67.0714373],
  ];

  NearestCity(24.8922812,67.0661058,test);
    return (
        <View style={styles.formView}>
            <Header
                leftComponent={<TouchableOpacity onPress={()=>logout()} style={styles.leftComponentView}>
                    <AntIcon name='logout' color='white' style={styles.logoutFont} />
                </TouchableOpacity>}
                centerComponent={<Text style={styles.titleStye}>Emergency Hospital Locator</Text>}
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
                        <SliderBox 

                            images={images}
                            autoplay
                            circleLoop
                            ImageComponentStyle={{width: '100%'}}
                            imageLoadingColor="#01C397"
                            resizeMethod={'resize'}
                            // resizeMode={'contain'}
                        />
                        <FlatList
                            numColumns={2}
                            keyExtractor={keyExtractor}
                            data={list}
                            renderItem={renderItem}
                            columnWrapperStyle={{ justifyContent: 'space-around' }}
                        />
                    </ScrollView>
                    // <ScrollView>
                    //     {
                    //         list.map((l, i) => (
                    //             <TouchableOpacity onPress={() => navigate(l)} key={i} style={styles.listItem}>
                    //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    //                     {l.icon}
                    //                     <Text style={styles.listTitle}>{l.name}</Text>
                    //                 </View>
                    //                 <SimpleIcon name='arrow-right' style={styles.arrowIcon} />
                    //             </TouchableOpacity>
                    //         ))
                    //     }
                    // </ScrollView>
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
        // borderBottomWidth: 1,
        height: 100,
        width:'45%',
        borderColor:'#dfe6e9',
        marginTop:15,
        borderRadius:10,
        borderWidth:1
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