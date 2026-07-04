import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/product';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/common';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Simple "pop" animation on favorite/unfavorite
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    toggleFavorite(product);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={[commonStyles.cardTitle, styles.title]}>{product.title}</Text>
        <Text style={[commonStyles.cardPrice, styles.price]}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={[styles.favoriteButton, favorited && styles.favoriteButtonActive]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Animated.Text
            style={[
              styles.favoriteIcon,
              { transform: [{ scale }] },
            ]}
          >
            {favorited ? '❤️' : '🤍'}
          </Animated.Text>
          <Text
            style={[
              styles.favoriteText,
              favorited && styles.favoriteTextActive,
            ]}
          >
            {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 40 },
  image: { width: '100%', height: 280, resizeMode: 'contain', backgroundColor: colors.background },
  body: { padding: 20 },
  category: { fontSize: 12, color: colors.textMuted, fontWeight: '600', marginBottom: 6 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  price: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
  description: { fontSize: 14, lineHeight: 21, color: colors.textFaint, marginBottom: 24 },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 14,
  },
  favoriteButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  favoriteIcon: { fontSize: 20, marginRight: 8 },
  favoriteText: { fontSize: 15, fontWeight: '700', color: colors.primary },
  favoriteTextActive: { color: colors.primaryDark },
});
