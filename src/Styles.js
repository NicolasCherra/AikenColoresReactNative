import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    Principal : {
        zIndex: -5,
        flex: 1,
        flexDirection: "column",
        
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
        backgroundColor: "#009846",
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
    seeProductsProducto:{
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        width:300,
        borderWidth: 0.5,
        borderRadius: 20
    },
    seeProductsNombre:{
        fontSize: 30
    },
    seeProductsImagen:{
        width: 250, 
        height: 250,
        borderWidth: 1,
        borderRadius: 20
    },
    seeProductsBotonModificar:{
        marginTop: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#009846",
        width: 150,        
        borderRadius: 8
    },
    seeProductsBotonEliminar:{
        marginTop: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f00",
        width: 150,        
        borderRadius: 8
    },
    seeProductsNombreBoton:{
        fontSize: 20,
        color: "#fff"
    }

});
export default Styles;