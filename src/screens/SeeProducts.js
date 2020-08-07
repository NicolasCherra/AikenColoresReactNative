import  * as React from 'react';
import {View, Text,TextInput,TouchableHighlight,Button,Image, SafeAreaView, ScrollView,Alert} from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Styles from '../Styles';

axios.defaults.withCredentials = true;

const SeeProducts=({navigation})=>{
       
    
    let [products,setProductos]=React.useState([]);
    let [recibido,setRecibido]=React.useState(false);


    React.useEffect( ()=> {
        getProducts()
    },[recibido]);


    const getProducts= async ()=>{
        console.log("GETPRODUCRTWS")
        await axios.get("https://aiken-colores-backend.herokuapp.com/souvenir").then((res)=>{
            setProductos(res.data)
            if(res.data==null){
                setRecibido(false);
            }else{
                setRecibido(true);
            }             
        })
        
    }

    const ShowProducts=()=>{

        console.log("SHOW PRODUCTS")
        var productosView=[];
        if(products!=null){
            for(let i=0; i<products.length; i++){
                productosView.push(
                    <View key={i} style={Styles.contenedorProducto}>
                        <Text style={Styles.tituloProducto} >{products[i].nombre}</Text>
                        <Text>{products[i].categoria}</Text>
                        <Image source={{uri:"data:image/jpeg;base64,"+products[i].imagenProducto}}  style={Styles.imagenProducto}/>
                        <Text>{products[i].stock}</Text>

                        <TouchableHighlight 
                        style={Styles.botonesProducto}
                        activeOpacity={0.6} 
                        underlayColor="#ff0"
                        onPress={()=>navigation.navigate('Modificar Producto',{_id:products[i]._id})}                                          
                        >
                        <Text 
                        style={Styles.textProducto}                     
                        >Modificar</Text>
                        </TouchableHighlight>

                        <TouchableHighlight 
                        style={Styles.botonesProducto}
                        activeOpacity={0.6} 
                        underlayColor="#f00"
                        key={i}    
                        onPress={()=>eliminarProducto(i)}               
                        >
                        <Text 
                        style={Styles.textProducto}                         
                        >Eliminar</Text>
                        </TouchableHighlight>
                        
                    </View>
                );
                
            }
            console.log("Hay productos")
            return productosView;
        }else
        {   console.log("no hay productos")
            return <Text>No se encontraron productos</Text>
        }
    }

    const eliminarProducto = async (i)=>{
        var seguro=false;
        
        Alert.alert("Advertencia","Estas seguro que quieres eliminar a "+products[i].nombre,[
            {
                text: 'Eliminar',
                onPress: () => seguro=true
            },
            {
                text: 'Cancelar',
                onPress: () => seguro=false
            }        
        ]);
        if(seguro==true){
            const url=`https://aiken-colores-backend.herokuapp.com/souvenir/${products[i]._id}`;
            try{
                await axios.delete(url).then(res=>{
                    if(res.status==200){
                        Alert.alert("Producto Eliminado Exitosamente");
                        ShowProducts();
                    }else{
                        Alert.alert("No se ha podido eliminar el producto");
                    }
                    
                })
            }catch(err){
                console.log(err)
            }
        }
    }
    
    const cargando = ()=>{
        console.log("Cargando")
        return <Text>Cargando</Text>
    }
    

    return(
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Button title="Actualizar" onPress={getProducts}></Button>
                    <Text>Productos en la BD</Text>
                    {recibido ? ShowProducts():cargando()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SeeProducts;