import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {View} from 'react-native';
import AddProducts from './screens/AddProducts';
import SeeProducts from './screens/SeeProducts';
import ModifyProduct from './screens/ModifyProduct';
import Styles from './Styles';

const Router = createDrawerNavigator();

export default function Principal(){
    return(
        <View style={Styles.Principal}>

            <NavigationContainer  >                
                <Router.Navigator
                    initialRouteName="Ver Productos de la BD"
                    drawerStyle={{
                        backgroundColor: '#fff',                        
                        width: 240
                    }}                  
                    drawerContentOptions={{
                        activeTintColor: '#e91e63',
                        itemStyle: {borderWidth:0.1, marginVertical: 10,backgroundColor: "#fff" }
                    }}
                >
                    <Router.Screen name="Ver Productos de la BD"  component={SeeProducts} />
                    <Router.Screen name="Añadir Producto a la BD"  component={AddProducts} />
                    <Router.Screen name="Modificar Producto"component={ModifyProduct} />                                                        
                </Router.Navigator>
            </NavigationContainer>

        </View>
    );
}