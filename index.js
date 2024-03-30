import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyHeader from './screens/Header';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/Camera';
import CheckinScreen from './screens/Checkin';
import LogoutScreen from './screens/Logout';
import PostScreen from './screens/Post';

const Stack = createStackNavigator();
console.log();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ header: () => <CompanyHeader/> }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => <CompanyHeader/> }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <CompanyHeader/> }} />
        <Stack.Screen name="Camera" component={CameraScreen}  options={{ header: () => <CompanyHeader/> }}/>
        <Stack.Screen name="Checkin" component={CheckinScreen}  options={{ header: () => <CompanyHeader/> }}/>
        <Stack.Screen name="Logout" component={LogoutScreen} options={{ header: () => <CompanyHeader/> }}/>
        <Stack.Screen name="Post" component={PostScreen} options={{ header: () => <CompanyHeader/> }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


try {
  console.log('Registering app component with AppRegistry...');
  AppRegistry.registerComponent(appName, () => App);
  console.log('App component registered with AppRegistry.');
} catch (error) {
  console.error('Error registering app component:', error);
}
