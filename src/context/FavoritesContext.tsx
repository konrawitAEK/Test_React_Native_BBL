import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product';

const STORAGE_KEY = '@favorites_products';

interface FavoritesContextValue {
  favorites: Product[];
  isLoading: boolean;
  isFavorite: (id: number) => boolean;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted favorites on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.warn('Failed to load favorites from storage', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Persist whenever favorites change (skip the very first load)
  useEffect(() => {
    if (isLoading) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(
      (error) => console.warn('Failed to save favorites', error)
    );
  }, [favorites, isLoading]);

  const isFavorite = useCallback(
    (id: number) => favorites.some((item) => item.id === id),
    [favorites]
  );

  const addFavorite = useCallback((product: Product) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    (product: Product) => {
      if (isFavorite(product.id)) {
        removeFavorite(product.id);
      } else {
        addFavorite(product);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const value = useMemo(
    () => ({
      favorites,
      isLoading,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, isLoading, isFavorite, addFavorite, removeFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
