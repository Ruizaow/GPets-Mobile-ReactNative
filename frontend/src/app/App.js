import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from '@context/AuthContext';
import { ThemeProvider } from '@context/ThemeContext';
import { HomeViewProvider } from '@context/HomeViewContext';
import { ProfileTabProvider } from '@context/ProfileTabContext';
import { PostsProvider } from '@context/PostsContext';
import { MapProvider } from '@context/MapContext';

import Start from '@views/Start';
import Auth from '@views/Auth';
import Home from '@views/Home';
import Profile from '@views/Profile';
import Messages from '@views/Messages';
import PostView from '@views/PostView';
import PostForm from '@views/PostForm';
import Bookmarks from '@views/Bookmarks';
import Notifications from '@views/Notifications';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HomeViewProvider>
          <ProfileTabProvider>
            <PostsProvider>
              <MapProvider>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Start' component={Start}/>
                    <Stack.Screen name='Auth' component={Auth}/>
                    <Stack.Screen name='Home' component={Home}/>
                    <Stack.Screen name='Profile' component={Profile}/>
                    <Stack.Screen name='Messages' component={Messages}/>
                    <Stack.Screen name='PostView' component={PostView}/>
                    <Stack.Screen name='PostForm' component={PostForm}/>
                    <Stack.Screen name='Bookmarks' component={Bookmarks}/>
                    <Stack.Screen name='Notifications' component={Notifications}/>
                  </Stack.Navigator>
                </NavigationContainer>
              </MapProvider>
            </PostsProvider>
          </ProfileTabProvider>
        </HomeViewProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

registerRootComponent(App);