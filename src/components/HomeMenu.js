import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () =>
                        <Ionicons name="home" size={24} color="black" />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: () => ( //revisar si es necesario poner size={size} color={color} o esta ok asi
                        <Ionicons name="person" size={24} color="black" />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="NewPost"
                component={NewPost}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="post-add" size={24} color="black" />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}