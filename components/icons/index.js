import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Heading from '../../components/heading';

export default function Icons() {
    const iconList1 = [
        {
            icon: 'map-pin',
            title: 'Location'
        },
        {
            icon: 'navigation',
            title: 'Current location'
        },
        {
            icon: 'user',
            title: 'Profile'
        },
        {
            icon: 'plus-square',
            title: 'Create listing'
        },
        {
            icon: 'search',
            title: 'Search'
        },
        {
            icon: 'heart',
            title: 'Saved'
        }
    ];
    const iconList2 = [
        {
            icon: 'log-in',
            title: 'Logout'
        },
        {
            icon: 'settings',
            title: 'Settings'
        },
        {
            icon: 'calendar',
            title: 'Calendar'
        },
        {
            icon: 'menu',
            title: 'Menu'
        },
        {
            icon: 'sliders',
            title: 'Filter'
        },
        {
            icon: 'chevron-left',
            title: 'Back'
        }
    ]
    return (
        <View style={styles.brandView}>
            <Heading title={'Icons'} />
            <View style={styles.brandTextView}>
                <View style={styles.iconsView}>
                    {
                        iconList1.map(item => {
                            return <View style={styles.listView}>
                                <Icon name={item.icon} size={25} color="#01c397" />
                                <Text style={styles.listText}>{item.title}</Text>
                            </View>
                        })
                    }
                </View>
                <View style={[styles.iconsView, { paddingLeft: 5 }]}>
                    {
                        iconList2.map(item => {
                            return <View style={styles.listView}>
                                <Icon name={item.icon} size={25} color="#01c397" />
                                <Text style={styles.listText}>{item.title}</Text>
                            </View>
                        })
                    }
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    brandView: {
        width: '100%',
        marginVertical: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    brandTextView: {
        flexDirection: 'row'
    },
    iconsView: {
        flexGrow: 1
    },
    listView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7,
    },
    listText: {
        paddingLeft: 12,
        fontSize: 16,
        color: '#4a4a4a'
    }
});