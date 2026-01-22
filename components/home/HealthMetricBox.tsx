import { StyleSheet, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { MetricData } from '@/types/health.types';

interface HealthMetricBoxProps {
  metric: MetricData;
}

export const HealthMetricBox = ({ metric }: HealthMetricBoxProps) => {
  return (
    <View style={styles.container}>
      <IconSymbol name={metric.icon as any} size={30} color={metric.color} />
      <ThemedText type="defaultSemiBold" style={styles.value}>
        {metric.value.toLocaleString('id-ID')}
      </ThemedText>
      <ThemedText style={styles.label}>{metric.label}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  value: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
});