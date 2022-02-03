import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import Blogs from './screens/blogsScreen';
import Comments from './screens/commentsScreen';
import NetInfo from '@react-native-community/netinfo';


export default function App() {

  const Stack = createNativeStackNavigator()

  return (

    <RootSiblingParent>
    <NavigationContainer>
    <Stack.Navigator>

    <Stack.Screen name="Blogs" component={Blogs} options={{ title: 'BlogPosts', headerStyle:{backgroundColor: 'white'} }}/>
    <Stack.Screen name="Comments" component={Comments} options={{ title: 'Comments for this Blog' }}/>

    </Stack.Navigator>
  </NavigationContainer>

  </RootSiblingParent>
    
  );
}


