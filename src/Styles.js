import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    Principal : {
        zIndex: -5,
        flex: 1,
        flexDirection: "column",
        
    },  
    header: {
        zIndex: -5,
        flex: 0.1,
        backgroundColor: "#ff0",
        
    },
    Main:{
        flex: 3,
        marginTop: 20,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    addProductsTitulo:{
        marginTop: 8,
        marginBottom:5,
        fontSize: 30
    },
    InputText: {
        backgroundColor: 'white',
        borderColor: "#ccc",
        marginTop: 10,
        borderWidth: 1,
        height: 50,
        width: 200
    },

    addProductsBoton:{
        backgroundColor: "#905",
        height: 50,
        marginTop: 20,
        width: 200,
        borderRadius: 20
    },
    addProductsText:{
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20
    },
    contenedorProducto:{
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2
    },
    tituloProducto:{
        fontSize: 30
    },
    imagenProducto:{
        width: 200, 
        height: 200
    },
    botonesProducto:{
        marginTop: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#624983",
        width: 150,        
        borderRadius: 30
    },
    textProducto:{
        fontSize: 20,
        color: "#fff"
    },
    footer: {
        zIndex: -5,
        flex: 0.1,
        backgroundColor: "#55f",       
    }

});
export default Styles;