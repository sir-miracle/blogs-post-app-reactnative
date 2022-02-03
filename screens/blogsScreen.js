import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import Toast from 'react-native-root-toast';
import NetInfo from '@react-native-community/netinfo';
//import { styles } from './styles';
import {Dimensions, StyleSheet, Text, View, SafeAreaView, TextInput, FlatList,
   ActivityIndicator, Button, TouchableOpacity, Keyboard } from 'react-native';

   export default function Blogs({navigation}){


    const[dataArray, setData] = useState([])
    const[filteredData, setFiltereddata] = useState([])
    const[search, setSearch] = useState('')
    const[loading, isLoading] = useState(true)
    const APIURL = "https://jsonplaceholder.typicode.com/posts"
    const [yourPostTitle, setPostTitle] = useState('')
    const [yourPostBody, setPostBody] = useState('')
  
    const pressHandler =(item) => {
        navigation.navigate('Comments', {item} )
     // we are navigating to the comments screen and also passing data (item as an object) to the screen
    }
  
     const fetchData =() => {
      isLoading(true)

      //check internet connection before fetching data
      NetInfo.fetch().then(state => {
        if(state.isConnected){
          fetch(APIURL)
          .then((response) =>response.json())
          .then((json) => {console.log(json), setFiltereddata(json), setData(json), isLoading(false)})
          .catch((err) => {console.log(err)})

        }else{
          Toast.show('Error due to no internet connection',{duration: Toast.durations.LONG,})
        }
      });

      
     }

     const titleChangeHandler = (val) =>{
        setPostTitle(val)
     }

     const postChangeHandler = (val) =>{
        setPostBody(val)
        console.log(yourPostBody)
     }

     const searchFilter =(text) =>{

      Keyboard.dismiss()
      if(text){
        const newData = dataArray.filter(
          function (item){

            const itemData = item.title ? item.title.toUpperCase() : ''.toLowerCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
          }           

        );

        setFiltereddata(newData);
        setSearch(text);
        
      }else{
        setFiltereddata(dataArray);
        setSearch(text);
      }

     }


     function postBlog () {
      
      NetInfo.fetch().then(state => {
        if(state.isConnected){

          if(yourPostTitle.length !== 0 && yourPostBody.length !==0){

            fetch(APIURL, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  title: yourPostTitle,
                  body: yourPostBody
                })
              })
              .then(response => response.json())
             .then((json) => { Toast.show('Comment sent successfully',{duration: Toast.durations.SHORT,}),
                 Keyboard.dismiss()})
             .catch((error) =>{ alert(`${error}`), Keyboard.dismiss()})

        }else{

            alert(`Make sure the Title and Body Fields of your Post are not empty`)            
        }
        }else{
          Keyboard.dismiss()
          Toast.show('Cannot upload your Blog due to no internet connection',{duration: Toast.durations.LONG,})
        }
      });


        

     }
  
     useEffect(() =>{
       fetchData()
     }, [])

     
     return(

<SafeAreaView style={styles.container}>

<ActivityIndicator size={'large'} animating={loading} color='blue'/>

  <TextInput
  style={styles.search}
  placeholder="Search for blog"
  multiline
  value={search}
  underlineColorAndroid="transparent"
  onChangeText={(text) => searchFilter(text)}
  
  />

  <FlatList style={styles.flatLIstStyle}

  onRefresh={()=> fetchData()}
  refreshing={loading}
  
  keyExtractor={(item )=> item.id}
  data={filteredData}
   renderItem={({item})=> (
    <TouchableOpacity onPress={()=> pressHandler(item)} style={styles.touchableopacityField}>

          <Text style ={styles.blogtitleheader}> Blog Title: </Text>
           <Text style={styles.titleStyle}>
             {item.title}
           </Text>
           <Text style={styles.theBlogheader}> The Blog: </Text>
           <Text style={styles.body}>
             {item.body}
           </Text>
       </TouchableOpacity>
       

   )}
  />

  <View>
  <TextInput style ={styles.titleInputField}
   placeholder="Add your post title"
   multiline
   onChangeText={titleChangeHandler}
  />
<TextInput style ={styles.inputField}
   placeholder="Add your post"
   multiline
   onChangeText={postChangeHandler}
  />
  <View style={styles.button}>
    <Button
    title='Upload Post'
    color= 'coral'
    onPress={postBlog}
    />
    </View>

  </View>

<StatusBar style="auto" />
</SafeAreaView>


);

   }


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
      fontSize:20,
      paddingHorizontal: 20,
      marginBottom: 4,
      backgroundColor: '#F4F4CA',
      flex: 1,
      color: 'blue',
      elevation: 20,
      alignItems: 'center',
      justifyContent: 'center',

      paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
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
      body:{
        backgroundColor: '#F4F4CA',
        fontSize: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,

      },
      button:{
        width:100,
        alignSelf: 'center',
        marginTop: 10,
      },
      titleInputField:{
        width: 300,
        height: 30,
        backgroundColor: '#CBD5CA',
        marginRight: 30,
        marginTop: 10,
        marginLeft: 30,
        paddingHorizontal: 10,
        borderRadius: 10
      },
      flatLIstStyle:{
        width: width/1.13,
        borderRadius: 4,
        backgroundColor: '#CBD5CA',
      },
      blogtitleheader:{
        backgroundColor: '#CBD5CA',
        fontSize: 20,
        fontStyle: 'italic'
      },
      theBlogheader:{
        backgroundColor: '#CBD5CA',
        fontSize: 16,
        fontStyle: 'italic'

      },
      search:{
        width: 320,
        height: 40,
        backgroundColor: '#CBD5CA',
        marginRight: 30,
        marginBottom: 30,
        marginLeft: 30,
        paddingHorizontal: 10,
        borderRadius: 10
      },
      touchableopacityField:{
        backgroundColor: '#CBD5CA',
        marginVertical: 20



      }

  });