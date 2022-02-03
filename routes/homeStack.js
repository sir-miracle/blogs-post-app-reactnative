import { createStackNavigator } from "react-navigation-stack";
 import { createAppContainer } from  "react-navigation"
 import { BlogsScreen } from '../screens/blogsScreen'
 import {CommentsScreen} from '../screens/commentsScreen'
 

 //here we configure the different screens
//  const screens = {
//     BlogsScreen: {
//         screen: BlogsScreen
//     },
//     CommentsScreen: {
//         screen: CommentsScreen
//     }

//  }
//  //this creates a stack navigator, stored inside HomeStack
//  const HomeStack = createStackNavigator(screens);

//  export default createAppContainer(HomeStack);