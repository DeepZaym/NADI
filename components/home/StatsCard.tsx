import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
  backgroundColor?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  subtitle,
  backgroundColor = '#2980b9' 
}: StatsCardProps) => {
  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="title" style={styles.value}>
        {value.toLocaleString('id-ID')}
      </ThemedText>
      <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: '#fff',
    opacity: 0.9,
  },
  value: {
    fontSize: 42,
    color: '#fff',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#eee',
    fontSize: 14,
  },
});