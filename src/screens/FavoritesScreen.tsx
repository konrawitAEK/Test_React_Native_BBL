import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types/product';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/common';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={[commonStyles.centered, styles.emptyPadding]}>
        <Text style={styles.emptyIcon}>🤍</Text>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubtext}>
          Tap the heart on a product to add it here
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={commonStyles.card}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={commonStyles.cardInfo}>
        <Text style={[commonStyles.cardTitle, styles.title]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[commonStyles.cardPrice, styles.price]}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={commonStyles.screenContainer}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={commonStyles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyPadding: { padding: 20 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '700', color: colors.textSecondary },
  emptySubtext: { fontSize: 13, color: colors.textMuted, marginTop: 4, textAlign: 'center' },
  thumbnail: { width: 60, height: 60, resizeMode: 'contain', marginRight: 12 },
  title: { fontSize: 13 },
  price: { fontSize: 14 },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.dangerLight,
    borderRadius: 8,
  },
  removeButtonText: { color: colors.danger, fontWeight: '700', fontSize: 12 },
});
