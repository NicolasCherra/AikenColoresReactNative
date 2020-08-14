import  * as React from 'react';
import {View, Text,TouchableHighlight,Button,Image,
SafeAreaView, ScrollView,RefreshControl, Alert} from 'react-native';
import axios from 'axios';
import Styles from '../Styles';

const SeeProducts=({navigation})=>{
    let [products,setProductos]=React.useState([]);
    let [recibido,setRecibido]=React.useState(false);
    let [refresh,setRefresh]=React.useState(false);

    React.useEffect( ()=> {
        getProducts()
    },[recibido]);

    const getProducts= async ()=>{
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
        var productosView=[];

        if(products!=null){            
            for(let i=0; i<products.length; i++){
                productosView.push(
                    <View 
                        key={i} 
                        style={Styles.contenedorProducto}
                    >

                        <Text
                            style={Styles.tituloProducto}
                        >
                            {products[i].nombre}
                        </Text>

                        <Text>
                            {products[i].categoria}
                        </Text>

                        <Image 
                            source={{uri:"data:image/jpeg;base64,"+products[i].imagenProducto}}  
                            style={Styles.imagenProducto}
                        />

                        <Text>
                            {products[i].stock}
                        </Text>

                        <TouchableHighlight 
                            style={Styles.botonesProducto}
                            activeOpacity={0.6} 
                            underlayColor="#ff0"
                            onPress={()=>navigation.navigate('Modificar Producto',{_id:products[i]._id})}                                          
                        >

                            <Text 
                                style={Styles.textProducto}                     
                            >
                                Modificar
                            </Text>

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
                            >
                                Eliminar
                            </Text>

                        </TouchableHighlight>
                        
                    </View>
                );                
            }
            return productosView;
        }else
        {   
            return <Text>No se encontraron productos</Text>
        }
    }

    const eliminarProducto = async (i)=>{
        let ID=products[i]._id;
        var seguro=false;        
        Alert.alert("Advertencia","Estas seguro que quieres eliminar a "+products[i].nombre,[
            {
                text: 'Eliminar',
                onPress: () => eliminar(ID)
            },
            {
                text: 'Cancelar',
                onPress: () => seguro=false
            }        
        ]);
    }

    const eliminar=async (ID)=>{        
            const url=`https://aiken-colores-backend.herokuapp.com/souvenir/${ID}`;
            try{
                await axios.delete(url).then(res=>{
                    console.log("PAPA")
                    if(res.status==200){
                        Alert.alert("Producto Eliminado Exitosamente");
                        getProducts()
                        ShowProducts();
                    }else{
                        Alert.alert("No se ha podido eliminar el producto");
                    }                    
                });
            }catch(err){
                console.log(err)
            }
    }
    
    const cargando = ()=>{
        return <Text>Cargando</Text>
    }

    const onRefresh=()=>{
        setRefresh(true);
        wait(2000).then(() =>{setRefresh(false); getProducts();});
    }

    const wait=(timeout)=>{
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
    }
    
    return(
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={refresh} 
                        onRefresh={onRefresh} 
                    />
                }   
            >

                <View 
                    style={Styles.Main}
                >

                    <Text>
                        Productos en la BD
                    </Text>

                    {recibido ? ShowProducts():cargando()}

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
export default SeeProducts;