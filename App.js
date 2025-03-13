import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/Home';
import ProductsScreen from './src/screens/Products';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { width: 400 }, // Left Sidebar width
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Products" component={ProductsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768; // Adjust for tablet/desktop

  return (
    <NavigationContainer>
      {isDesktop ? <DrawerNavigation /> : <BottomTabs />}
    </NavigationContainer>
  );
}
