import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { RootStackParamList, RootTabParamList } from '../types/product';
import { useFavorites } from '../context/FavoritesContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Detail' }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { favorites } = useFavorites();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="ProductsTab"
          component={ProductsStack}
          options={{
            title: 'Products List',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🛍️</Text>
            ),
          }}
        />
        <Tab.Screen
          name="FavoritesTab"
          component={FavoritesScreen}
          options={{
            title: 'Favorites',
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>❤️</Text>
            ),
            tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
