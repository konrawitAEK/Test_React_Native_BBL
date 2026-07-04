import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  cardPrice: {
    fontWeight: '700',
    color: colors.primary,
  },
  errorBanner: {
    padding: 10,
    backgroundColor: colors.dangerLight,
  },
  errorText: {
    color: colors.danger,
    textAlign: 'center',
  },
});
