import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Styles from '../Styles';

export default function Header(){

    return (
        <View style={Styles.header}>
            <Text>Header</Text>
        </View>
    );
}