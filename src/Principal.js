import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Content,Text,View} from 'react-native';

import Header from './layout/Header';
import Styles from './Styles';
import Footer from './layout/Footer';

import Inicio from './screens/Inicio';
import Categoria from './screens/Categoria';
import AddProducto from './screens/AddProducto';


const Router = createDrawerNavigator();

export default function Principal(){

    return(
        <View style={Styles.container}>

            <Header/>
            
            <NavigationContainer  >
                <Router.Navigator
                initialRouteName="Inicio"
                 drawerStyle={{
                    backgroundColor: '#c6cbef',
                    width: 240
                  }}
                  
                  drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 10,backgroundColor: "#fff" },
                    style:{zIndex:5}
                  }}
                >
                    <Router.Screen name="Inicio"  component={Inicio} />
                    <Router.Screen name="Categoria"  component={Categoria} />
                    <Router.Screen name="Añadir Producto a la BD"  component={AddProducto} />
                </Router.Navigator>
            </NavigationContainer>

            <Footer/>

        </View>
    );
}