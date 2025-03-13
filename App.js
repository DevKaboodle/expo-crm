
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home';
import ProductsScreen from './src/screens/Products';
// import TransactionsScreen from './src/screens/TransactionsScreen';
// import CustomersScreen from './src/screens/CustomersScreen';
// import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Products" component={ProductsScreen} />
        {/* <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Customers" component={CustomersScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}