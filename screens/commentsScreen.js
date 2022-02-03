import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import Toast from 'react-native-root-toast';
import NetInfo from '@react-native-community/netinfo';
//import { styles } from './styles';
import { StyleSheet, Text, Dimensions, View, SafeAreaView, TextInput, FlatList,
   ActivityIndicator, Button, TouchableOpacity, Keyboard } from 'react-native';

   export default function Comments({route, navigation}){

    const[commentsdataArray, setData] = useState([])
    const[loading, isLoading] = useState(true)
    const [yourComment, setComment] = useState('')

    //to recieve the data passed from the blogs screen;
    const {item} = route.params;
    const commentId = item.id;
    const theBlog = item.body;
    

    const APIURL = `https://jsonplaceholder.typicode.com/posts/${commentId}/comments`

    const commentHandler = (val) =>{
        setComment(val)
        console.log(yourComment)
     }

     function postComment () {

      NetInfo.fetch().then(state =>{

        if(state.isConnected){

          if(yourComment.length !==0){

            fetch(APIURL, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  body: yourComment
                })
              })
              .then(response => response.json())
              .then((json) => { Toast.show('Comment sent successfully',{duration: Toast.durations.SHORT,}),
                  Keyboard.dismiss()})
              .catch((error) =>{ alert(`${error}`), Keyboard.dismiss()})
 
        }else{
 
            alert(`You cannot post empty comment`)            
        }


        }else{
          Keyboard.dismiss()
          Toast.show('Cannot post comment due to no internet connection',{duration: Toast.durations.LONG,})
        }

      })
         
    }

    const fetchCommentsData =() => {
      isLoading(true) //has to be true again because on refresh, we try to fetch the data again 
      NetInfo.fetch().then(state =>{

        if(state.isConnected){
          fetch(APIURL)
        .then((resposnse) =>resposnse.json())
        .then((json) => { setData(json), console.log(json), isLoading(false)})
        .catch((err) => {console.log(err)})

        }else{
          Toast.show('Error due to no internet connection',{duration: Toast.durations.LONG,})
        }

      })

        
       }

    
       useEffect(() =>{
         fetchCommentsData()
       }, [])



    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.theBlog}>{theBlog}</Text>
                <Text style ={styles.commentsHeader}>Comments for this blog:</Text>
            </View>

    <ActivityIndicator size={'large'} animating={loading} color= 'blue'/>

    <FlatList style={styles.comments}
    onRefresh={()=> fetchCommentsData()}
    refreshing={loading}

  data={commentsdataArray}
   renderItem={({item})=> ( 
           <Text style={styles.commentsText}>
             {item.body}
           </Text>
   )}
  />
  

        <View>

        <TextInput style ={styles.inputField}
        placeholder="add your own comment"
        multiline
        
        onChangeText={commentHandler}
            />
            <View style={styles.button}>
            <Button 
                title='send'
                color= 'coral'
                onPress = {postComment}
            />
            </View>

        </View>
        </SafeAreaView>
        
    );
   }

   const{screenwidth, screenheight} = Dimensions.get("screen")

   const styles = StyleSheet.create({

    container:{
        flex: 1,
      height: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 1,
      padding: 10
    },

    comments:{
        flex: 1,
        color: 'blue',
        

    },

    commentsText:{

        flex: 1,
        color: 'blue',
        backgroundColor: '#F4F4CA',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        borderRadius: 10,
        elevation: 9,
        padding: 5,
    },
    inputField:{
        width: 300,
        height: 60,
        backgroundColor: '#CBD5CA',
        marginRight: 30,
        marginTop: 10,
        marginLeft: 30,
        paddingHorizontal: 10,
        borderRadius: 10
      },
      theBlog:{
        width: 330,
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 5
        },
        shadowOpacity: 0.75,
        elevation: 19,
        padding: 4,
          color: 'white',
          borderRadius: 5,
          fontSize: 17,
          backgroundColor: 'coral'
      },
      button:{
        width:100,
        alignSelf: 'center',
        marginTop: 10,
      },
      commentsHeader:{
        marginTop: 8,
        paddingHorizontal: 10,
        fontStyle:'italic',
        fontSize: 17,

      }


   })