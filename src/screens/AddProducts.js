import * as React from 'react';
import {View, Text,TextInput,TouchableHighlight,Button,Image, SafeAreaView, ScrollView,
Alert} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Styles from '../Styles';

export default class AddProducts extends React.Component{    
    constructor(props){
        super(props);
        this.state={
            nombre: "",
            categoria: "",
            descripcion: "",
            precio: "",
            stock: "",
            fecha:"",
            imagenProducto: null,
            imagen: null
        };
        this.submit=this.submit.bind(this);
    }
    
    async submit(){
        const getCurrentDate = () => {
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var hor= new Date().getHours();
            var min=new Date().getMinutes();
            var seg=new Date().getSeconds();
            return date + '/' + month + '/' + year +" " + hor+":"+min+":"+seg;//format: dd-mm-yyyy;
        }        
        try{
            await axios.post("https://aiken-colores-backend.herokuapp.com/souvenir",{
                nombre: this.state.nombre,
                categoria: this.state.categoria,
                descripcion: this.state.descripcion,
                precio: this.state.precio,
                stock: this.state.stock,
                fecha: getCurrentDate(),
                imagenProducto: this.state.imagenProducto,                
            }).then(res=>{
                if(res.status==200){
                    Alert.alert("Se ha agregado satifactoriamente");
                    this.setState({nombre: ""})
                    this.setState({categoria: ""})
                    this.setState({descripcion: ""})
                    this.setState({precio: ""})
                    this.setState({stock: ""})
                    this.setState({fecha: ""})
                    this.setState({imagenProducto: ""})
                }else{
                    Alert.alert("No se puedo agregar ha acurrido un error");
                }
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
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true
            });
            if (!result.cancelled) {
                this.setState({ imagenProducto: result.base64 });                    
                this.setState({ imagen: result.uri});
            }
        } catch (E) {
            console.log(E);
        }
    }

    inputText=()=>{        
        //let met=[Styles.addProductsInputText]
        return Styles.InputText;
    }
    
    render(){
        let { imagenProducto } = this.state;
        return (
            <SafeAreaView>
                <ScrollView>
            
                    <View 
                        style={Styles.Main}
                    >

                        <Text  
                            style={Styles.addProductsTitulo}
                        >
                            Añadir Nuevo Producto
                        </Text>

                        <TextInput
                            style={this.inputText()}
                            placeholder="Nombre"
                            value={this.state.nombre}
                            onChangeText={text=>this.setState({nombre:text})}
                        />

                        <TextInput
                            style={this.inputText()}
                            placeholder="Categoria"
                            value={this.state.categoria}
                            onChangeText={text=>this.setState({categoria:text})}
                        />

                        <TextInput
                            style={this.inputText()}
                            placeholder="Descripcion"
                            value={this.state.descripcion}
                            onChangeText={text=>this.setState({descripcion:text})}
                        />

                        <TextInput
                            style={this.inputText()}
                            placeholder="Precio"
                            value={this.state.precio}
                            keyboardType="number-pad"
                            onChangeText={text=>this.setState({precio:text})}
                        />

                        <TextInput           
                            style={this.inputText()}
                            placeholder="Stock"
                            value={this.state.stock}
                            onChangeText={text=>this.setState({stock:text})}
                        />

                        <View 
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop: 10 }}
                        >
                            
                            <Button
                                title="Añadir Foto" 
                                onPress={this._pickImage} 
                            />

                            <Image 
                                source={{ uri: this.state.imagen }} 
                                style={{marginTop:10, width: 300, height: 200 }} 
                            />
                        
                        </View>

                        <TouchableHighlight 
                            style={Styles.addProductsBoton}
                            activeOpacity={0.6} 
                            underlayColor="#ff0"
                            onPress={this.submit}
                        >

                            <Text 
                                style={Styles.addProductsText} 
                            >
                                Añadir
                            </Text>

                        </TouchableHighlight>

                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
}