import {StyleSheet,PixelRatio} from 'react-native';


var FONT_BACK_LABEL   = 18;
if (PixelRatio.get() <= 2) {
    FONT_BACK_LABEL = 14;
  }

const Styles = StyleSheet.create({
    container : {
        zIndex: -5,
        flex: 1,
        flexDirection: "column",
        
    },  
    header: {
        zIndex: -5,
        flex: 0.1,
        backgroundColor: "#ff0",
        
    },
    main:{
        flex: 3,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    titulo:{
        marginTop: 8,
        marginBottom:5,
        fontSize: 30
    },
    InputText: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        height: 50,
        width: 200,
    },
    botonAdd:{
        backgroundColor: "#905",
        height: 50,
        marginTop: 20,
        width: 200,
        borderRadius: 20
    },
    textAdd:{
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20
    },
    footer: {
        zIndex: -5,
        flex: 0.1,
        backgroundColor: "#55f",
       
    }

});

export default Styles;