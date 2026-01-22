import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useHealthStats } from '@/hooks/useHealthStats';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from 'react-native';

interface MetricData {
  icon: string;
  value: number;
  label: string;
  color: string;
  emoji: string;
}

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { stats, loading } = useHealthStats();

  const healthMetrics: MetricData[] = [
    {
      icon: 'figure.walk',
      value: stats.steps,
      label: 'Langkah',
      color: '#00B4D8',
      emoji: '👟',
    },
    {
      icon: 'flame.fill',
      value: stats.calories,
      label: 'Kalori',
      color: '#FF6B6B',
      emoji: '🔥',
    },
    {
      icon: 'heart.fill',
      value: 72,
      label: 'Detak Jantung',
      color: '#E91E63',
      emoji: '💓',
    },
    {
      icon: 'drop.fill',
      value: 6,
      label: 'Gelas Air',
      color: '#2196F3',
      emoji: '💧',
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00B4D8" />
        <ThemedText style={styles.loadingText}>tenang aja, pohon yang kita tanam bukan sawit kok...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroBackground}>
          <IconSymbol
            name="sparkles"
            size={width > 400 ? 140 : 120}
            color="rgba(255,255,255,0.2)"
            style={styles.heroIcon}
          />
        </View>
        
        <View style={styles.heroContent}>
          <ThemedText style={styles.greeting}>Halo, Senang melihatmu kembali lagi!</ThemedText>
          <ThemedText type="title" style={styles.heroTitle}>Jejak Nadi</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Yuk, ubah lelah hari ini menjadi senyum bagi sesama!
          </ThemedText>
        </View>
      </View>

      {/* Main Stats Card - Aset Kebaikan */}
      <View style={styles.mainCardWrapper}>
        <View style={styles.mainCard}>
          <View style={styles.mainCardHeader}>
            <IconSymbol name="heart.fill" size={32} color="#FF6B6B" />
            <ThemedText style={styles.mainCardLabel}>Aset Kebaikanmu</ThemedText>
          </View>
          
          <ThemedText style={styles.mainCardValue}>
            {stats.goodPoints.toLocaleString('id-ID')}
          </ThemedText>
          
          <View style={styles.mainCardFooter}>
            <View style={styles.badge}>
              <IconSymbol name="star.fill" size={16} color="#FFA500" />
              <ThemedText style={styles.badgeText}>Poin Tersedia</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Health Metrics Grid */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="chart.bar.fill" size={24} color="#00B4D8" />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Aktivitas Hari Ini
          </ThemedText>
        </View>
        
        <View style={styles.metricsGrid}>
          {healthMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={[styles.metricIconContainer, { backgroundColor: `${metric.color}15` }]}>
                <ThemedText style={styles.metricEmoji}>{metric.emoji}</ThemedText>
              </View>
              <ThemedText style={styles.metricValue}>
                {metric.value.toLocaleString('id-ID')}
                {metric.label === 'Detak Jantung' && <ThemedText style={styles.metricUnit}> bpm</ThemedText>}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Progress Insight Card */}
      <View style={styles.section}>
        <View style={styles.insightCard}>
          <View style={styles.insightIconWrapper}>
            <IconSymbol name="chart.line.uptrend.xyaxis" size={28} color="#4CAF50" />
          </View>
          
          <View style={styles.insightContent}>
            <ThemedText style={styles.insightTitle}>Ada kabar baik hari ini! 🎉</ThemedText>
            <ThemedText style={styles.insightText}>
              Kamu sudah tumbuh{' '}
              <ThemedText style={styles.insightHighlight}>
                {stats.growthPercent}%
              </ThemedText>{' '}
              lebih aktif dari minggu lalu. Badanmu makin bugar, tabungan kebaikanmu pun makin besar. Keren!
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFB',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
  },

  // Hero Section
  heroSection: {
    position: 'relative',
    paddingTop: width > 400 ? 20 : 10,
    paddingBottom: width > 400 ? 40 : 32,
    paddingHorizontal: width > 400 ? 24 : 20,
    backgroundColor: '#6366F1',
    borderBottomLeftRadius: width > 400 ? 40 : 32,
    borderBottomRightRadius: width > 400 ? 40 : 32,
    overflow: 'hidden',
    minHeight: width > 400 ? 160 : 140,
    marginTop: -20,
  },
  heroBackground: {
    position: 'absolute',
    top: width > 400 ? -30 : -20,
    right: width > 400 ? -40 : -30,
    opacity: 0.3,
  },
  heroIcon: {
    transform: [{ rotate: '-15deg' }],
  },
  heroContent: {
    zIndex: 1,
    paddingTop: width > 400 ? 40 : 30,
  },
  greeting: {
    fontSize: width > 400 ? 18 : 16,
    color: '#E2E8F0',
    marginBottom: 6,
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: width > 400 ? 42 : 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: width > 400 ? 12 : 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: width > 400 ? 16 : 15,
    color: '#F1F5F9',
    lineHeight: width > 400 ? 24 : 22,
    fontWeight: '400',
  },

  // Main Card (Aset Kebaikan)
  mainCardWrapper: {
    paddingHorizontal: width > 400 ? 24 : 20,
    marginTop: width > 400 ? 20 : 10,
    marginBottom: width > 400 ? 32 : 24,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mainCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  mainCardLabel: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  mainCardValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 16,
    letterSpacing: -1,
  },
  mainCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    color: '#EA580C',
    fontWeight: '600',
  },

  // Section
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },

  // Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricCard: {
    width: (width - 80) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    minHeight: 140,
  },
  metricIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricEmoji: {
    fontSize: 32,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  metricLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Insight Card
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  insightIconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 6,
  },
  insightText: {
    fontSize: 14,
    color: '#15803D',
    lineHeight: 20,
  },
  insightHighlight: {
    fontWeight: '800',
    color: '#16A34A',
    fontSize: 15,
  },

  bottomSpacing: {
    height: 32,
  },
});