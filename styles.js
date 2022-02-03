import { StyleSheet, Dimensions } from "react-native";

const{width, height} = Dimensions.get("screen")

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: height/1.13,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 10
    },
    titleStyle:{
      flex: 1,
      color: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView:{
      marginTop: 40,
    },

    inputField:{
        width: 300,
        height: 40,
        backgroundColor: '#CBD5CA',
        marginRight: 30,
        marginTop: 10,
        marginLeft: 30,
        paddingHorizontal: 10,
        borderRadius: 20
      },
      body:{
        backgroundColor: 'pink',
        fontSize: 15,
        paddingHorizontal: 10,

      }

  });

  export {styles}