import * as React from 'react';
import {View, Text,TextInput,TouchableHighlight,Button,Image} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Styles from '../Styles';

axios.defaults.withCredentials = true;

export default class AddProducto extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            nombre: " ",
            categoria: " ",
            descripcion: " ",
            precio: " ",
            stock: " ",
            fecha:" ",
            imagen: null
        };

        this.submit=this.submit.bind(this);
    }
    

    async submit(){
        //console.log(this.state);
        console.log("boton presionado");
        const getCurrentDate=()=>{

            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var hor= new Date().getHours();
            var min=new Date().getMinutes();
            var seg=new Date().getSeconds();
            return date + '/' + month + '/' + year +" " + hor+":"+min+":"+seg;//format: dd-mm-yyyy;
      }
        //console.log(getCurrentDate());
        
        try{
           await axios.post("https://aiken-colores-backend.herokuapp.com/souvenir",{
                nombre: this.state.nombre,
                categoria: this.state.categoria,
                descripcion: this.state.descripcion,
                precio: this.state.precio,
                stock: this.state.stock,
                fecha: getCurrentDate()
            });
        }catch(err){
            console.log(err)
        }
       
    }


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };
    
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync(
                {
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
            if (!result.cancelled) {
            this.setState({ imagen: result.uri });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };


    render(){

        let { imagen } = this.state;
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
                <TextInput
                    style={Styles.InputText}
                    placeholder="Descripcion"
                    value={this.state.descripcion}
                    onChangeText={text=>this.setState({descripcion:text})}
                />
                <TextInput
                    style={Styles.InputText}
                    placeholder="Precio"
                    value={this.state.precio}
                    keyboardType="number-pad"
                    onChangeText={text=>this.setState({precio:text})}
                />
                <TextInput
                    style={Styles.InputText}
                    placeholder="Stock"
                    value={this.state.stock}
                    onChangeText={text=>this.setState({stock:text})}
                />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Añadir Foto" onPress={this._pickImage} />
                    {imagen && <Image source={{ uri: imagen }} style={{ width: 200, height: 200 }} />}
                </View>




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

