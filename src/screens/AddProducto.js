import * as React from 'react';
import {View, Text,TextInput,TouchableHighlight} from 'react-native';
import Styles from '../Styles';

export default class AddProducto extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            nombre: " ",
            categoria: " ",
            descripcion: " ",
            precio: 0,
            imagen: ""
        };

        this.submit=this.submit.bind(this);
    }
    

    submit(){
        console.log(this.state.nombre);
        console.log(this.state.categoria);
        console.log("boton presionado");
    }

    render(){

        return (
            <View style={Styles.main}>
                <Text  style={Styles.titulo}>Añadir Nuevo Producto</Text>
                <TextInput
                    style={Styles.InputText}
                    placeholder="Nombre"
                    value={this.state.nombre}
                    onChangeText={text=>this.setState({nombre:text})}

                />
                <TextInput
                    style={Styles.InputText}
                    placeholder="Categoria"
                    value={this.state.categoria}
                    onChangeText={text=>this.setState({categoria:text})}

                />
                
                <TouchableHighlight 
                    style={Styles.botonAdd}
                    activeOpacity={0.6} 
                    underlayColor="#ff0"
                    onPress={this.submit}
                >
                    <Text 
                    style={Styles.textAdd} 
                    >Añadir</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

