import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Product } from '../types/product';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/common';
import { fetchProducts as fetchProductsApi } from '../services/productService';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

export default function ProductListScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchProductsApi();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Pull down to try again.');
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    })();
  }, [fetchProducts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={commonStyles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={[commonStyles.cardInfo, styles.info]}>
        <Text style={[commonStyles.cardTitle, styles.title]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[commonStyles.cardPrice, styles.price]}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={commonStyles.screenContainer}>
      {error && (
        <View style={commonStyles.errorBanner}>
          <Text style={commonStyles.errorText}>{error}</Text>
        </View>
      )}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={commonStyles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: { width: 70, height: 70, resizeMode: 'contain', marginRight: 12 },
  info: { justifyContent: 'center' },
  title: { fontSize: 14 },
  price: { fontSize: 15 },
});
