import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Content,Text,View} from 'react-native';
import Header from './layout/Header';
import Styles from './Styles';
import Footer from './layout/Footer';
import Inicio from './screens/Inicio';
import Categoria from './screens/Categoria';
import AddProducts from './screens/AddProducts';
import SeeProducts from './screens/SeeProducts';
import ModifyProduct from './screens/ModifyProduct';

const Router = createDrawerNavigator();

export default function Principal(){
    return(
        <View style={Styles.container}>        
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
                    <Router.Screen name="Añadir Producto a la BD"  component={AddProducts} />
                    <Router.Screen name="Ver Productos de la BD"  component={SeeProducts} />
                    <Router.Screen name="Modificar Producto"component={ModifyProduct} />
                </Router.Navigator>
            </NavigationContainer>
        </View>
    );
}