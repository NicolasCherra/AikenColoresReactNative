import * as React from 'react';
import axios from 'axios';
import {View, Text,TextInput,TouchableHighlight,Button,Image, SafeAreaView,
ScrollView,Alert,RefreshControl} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Styles from '../Styles';

export default class ModifyProduct extends React.Component{
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
            imagen: null,
            cambioFoto:false,
            refresh:false
        }        
        this.getProductById=this.getProductById.bind(this);
        this.submit=this.submit.bind(this);
        this.getPermissionAsync=this.getPermissionAsync.bind(this);
        this._pickImage=this._pickImage.bind(this);
        this.onRefresh=this.onRefresh.bind(this);
        this.wait=this.wait.bind(this);
    }

    componentDidMount(){
        console.log("COMPONETN")
        this.getProductById()
    }

    async getProductById(){
        await axios.get(`https://aiken-colores-backend.herokuapp.com/souvenir/${this.props.route.params._id}`).then(res=>{
            this.setState({nombre: res.data.nombre})
            this.setState({categoria: res.data.categoria})
            this.setState({descripcion: res.data.descripcion})
            this.setState({precio: res.data.precio})
            this.setState({stock: res.data.stock})
            this.setState({fecha: res.data.fecha})
            this.setState({imagenProducto: res.data.imagenProducto})
        })
    }

    async submit(){

        const getCurrentDate=()=>{
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var hor= new Date().getHours();
            var min=new Date().getMinutes();
            var seg=new Date().getSeconds();
            return date + '/' + month + '/' + year +" " + hor+":"+min+":"+seg;//format: dd-mm-yyyy;
        }

        try{
           await axios.put(`https://aiken-colores-backend.herokuapp.com/souvenir/${this.props.route.params._id}`,
           {
                nombre: this.state.nombre,
                categoria: this.state.categoria,
                descripcion: this.state.descripcion,
                precio: this.state.precio,
                stock: this.state.stock,
                fecha: getCurrentDate(),
                imagenProducto: this.state.imagenProducto,
                
            }).then(res=>{
                Alert.alert("Se ha modificado");
                this.props.navigation.goBack()

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
    }
    
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
                this.setState({cambioFoto: true});
            }
        } catch (E) {
            console.log(E);
        }
    }

    onRefresh(){
        this.state.refresh=true;
        this.wait(2000).then(() =>{this.state.refresh=false; this.getProductById();});
    }

    wait(timeout){
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
    }
    inputText=()=>{        
        //let met=[Styles.addProductsInputText]
        return Styles.InputText;
    }
    
    render(){
        return (
            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refresh} 
                            onRefresh={this.onRefresh} 
                        />
                    }                
                >
                    <View 
                        style={Styles.Main}
                    >

                        <Text  
                            style={Styles.addProductsTitulo}
                        >
                            Modificar Producto
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
                                title="Cambiar Foto" 
                                color="#f194ff"  
                                onPress={this._pickImage} 
                            />

                            {
                                this.state.cambioFoto==true
                                ?

                                <Image 
                                    source={{ uri: this.state.imagen }} 
                                    style={{marginTop:10, width: 300, height: 200 }} 
                                />
                                :
                                <Image 
                                    source={{ uri: "data:image/jpeg;base64,"+this.state.imagenProducto }} 
                                    style={{marginTop:10, width: 300, height: 200 }}
                                />
                            } 

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
                                Modificar
                            </Text>

                        </TouchableHighlight>

                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
}