import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const API_BASE_URL = 'http://localhost:3000/api';

interface Achievement {
  id: string;
  title: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

interface ActivityItem {
  id: string;
  type: 'exercise' | 'donation';
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

export default function ProfilScreen() {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [totalLifetimePoints, setTotalLifetimePoints] = useState(0);
  
  const userName = "DeepZaym";
  const userStatus = "Penjaga Amanah";

  useFocusEffect(
    useCallback(() => {
      fetchUserPoints();
    }, [])
  );

  const fetchUserPoints = async () => {
    try {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      const pointsStr = await AsyncStorage.getItem('user_points');
      const points = pointsStr ? parseInt(pointsStr) : 0;
      setTotalLifetimePoints(points);
    } catch (error) {
      console.error('Error fetching user points:', error);
      setTotalLifetimePoints(0);
    }
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: '🌳 Mangrove Guardian',
      icon: 'leaf.fill',
      color: '#10B981',
      unlocked: true
    },
    {
      id: '2', 
      title: '💧 Water Hero',
      icon: 'drop.fill',
      color: '#3B82F6',
      unlocked: true
    },
    {
      id: '3',
      title: '⚕️ Health Angel',
      icon: 'cross.fill',
      color: '#F59E0B',
      unlocked: false
    },
    {
      id: '4',
      title: '📚 Education Champion',
      icon: 'book.fill',
      color: '#8B5CF6',
      unlocked: false
    },
    {
      id: '5',
      title: '❤️ Social Warrior',
      icon: 'heart.fill',
      color: '#EF4444',
      unlocked: true
    }
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'exercise',
      title: 'Jogging Pagi',
      description: '5.432 langkah • 320 kalori',
      time: '2 jam lalu',
      icon: 'figure.walk',
      color: '#00B4D8'
    },
    {
      id: '2',
      type: 'donation',
      title: 'Air Bersih untuk Palestina',
      description: '500 poin didonasikan',
      time: '1 hari lalu',
      icon: 'drop.fill',
      color: '#3B82F6'
    },
    {
      id: '3',
      type: 'exercise',
      title: 'Yoga Session',
      description: '2.150 langkah • 45 menit',
      time: '2 hari lalu',
      icon: 'figure.mind.and.body',
      color: '#8B5CF6'
    }
  ];

  const amygdalaChatbot = [
    "Hei, aku tahu kamu lelah hari ini... tapi ingat, setiap langkah kecilmu itu berarti besar bagi seseorang di luar sana 💭",
    "Tubuhmu berteriak minta istirahat? Wajar. Tapi jiwa kebaikanmu bisik: 'Aku masih bisa berbagi' 🌱",
    "Kadang kita lupa... bahwa kebaikan terkecil hari ini bisa jadi harapan terbesar seseorang besok ✨",
    "Amigdalamu mungkin bilang 'cukup', tapi hatimu tahu... masih ada ruang untuk satu kebaikan lagi 💫"
  ];

  const handleChatbotReflection = () => {
    const randomReflection = amygdalaChatbot[Math.floor(Math.random() * amygdalaChatbot.length)];
    Alert.alert(
      "🧠 Suara Amigdala",
      randomReflection,
      [
        { text: "Terima kasih 🙏", style: "default" },
        { text: "Refleksi Lagi", onPress: handleChatbotReflection }
      ]
    );
  };

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
          <ThemedText style={styles.greeting}>Refleksi Diri Hari Ini 🪞</ThemedText>
          <ThemedText type="title" style={styles.heroTitle}>Cermin Diri</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Perjalanan kebaikanmu dimulai dari dalam
          </ThemedText>
        </View>
      </View>

      {/* Profile Header */}
      <View style={styles.profileWrapper}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>DZ</ThemedText>
            </View>
            <View style={styles.statusBadge}>
              <ThemedText style={styles.statusText}>✨</ThemedText>
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <ThemedText style={styles.userName}>{userName}</ThemedText>
            <ThemedText style={styles.userStatus}>{userStatus}</ThemedText>
          </View>
        </View>
      </View>

      {/* Point Summary */}
      <View style={styles.pointsSummaryWrapper}>
        <View style={styles.pointsSummaryCard}>
          <View style={styles.pointsHeader}>
            <IconSymbol name="trophy.fill" size={24} color="#F59E0B" />
            <ThemedText style={styles.pointsLabel}>Total Aset Kebaikan</ThemedText>
          </View>
          <ThemedText style={styles.pointsValue}>
            {totalLifetimePoints.toLocaleString('id-ID')} Poin
          </ThemedText>
          <ThemedText style={styles.pointsSubtext}>Akumulasi seumur hidup</ThemedText>
        </View>
      </View>

      {/* Achievement Grid */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.toggleHeader} 
          onPress={() => setShowAchievements(!showAchievements)}
        >
          <View style={styles.sectionHeaderContent}>
            <IconSymbol name="star.fill" size={24} color="#8B5CF6" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Pencapaian Kebaikan
            </ThemedText>
          </View>
          <IconSymbol 
            name={showAchievements ? "chevron.up" : "chevron.down"} 
            size={16} 
            color="#8B5CF6" 
          />
        </TouchableOpacity>
        
        {showAchievements && (
          <FlatList
            data={achievements}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementCarousel}
            keyExtractor={(item) => item.id}
            renderItem={({ item: achievement }) => (
              <View 
                style={[
                  styles.achievementItem,
                  { 
                    backgroundColor: achievement.unlocked ? `${achievement.color}15` : '#F1F5F9',
                    borderColor: achievement.unlocked ? achievement.color : '#E2E8F0'
                  }
                ]}
              >
                <IconSymbol 
                  name={achievement.icon as any} 
                  size={32} 
                  color={achievement.unlocked ? achievement.color : '#94A3B8'} 
                />
                <ThemedText style={[
                  styles.achievementTitle,
                  { color: achievement.unlocked ? achievement.color : '#94A3B8' }
                ]}>
                  {achievement.title}
                </ThemedText>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <ThemedText style={styles.unlockedText}>✓</ThemedText>
                  </View>
                )}
              </View>
            )}
          />
        )}
      </View>

      {/* Reflection Card */}
      <View style={styles.reflectionWrapper}>
        <View style={styles.reflectionCard}>
          <TouchableOpacity 
            style={styles.chatbotButton} 
            onPress={() => setShowChatbot(!showChatbot)}
          >
            <IconSymbol name="brain" size={20} color="#6366F1" />
            <ThemedText style={styles.chatbotButtonText}>Suara Amigdala</ThemedText>
            <IconSymbol 
              name={showChatbot ? "chevron.up" : "chevron.down"} 
              size={16} 
              color="#6366F1" 
            />
          </TouchableOpacity>
          
          {showChatbot && (
            <View style={styles.chatbotContent}>
              <ThemedText style={styles.chatbotDescription}>
                Dengarkan suara amigdalamu - chatbot yang menemanimu untuk refleksi setiap hari 🧠
              </ThemedText>
              <TouchableOpacity style={styles.chatbotActionButton} onPress={handleChatbotReflection}>
                <IconSymbol name="message.fill" size={16} color="#FFFFFF" />
                <ThemedText style={styles.chatbotActionText}>Mulai Refleksi</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Activity Timeline */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.toggleHeader} 
          onPress={() => setShowActivities(!showActivities)}
        >
          <View style={styles.sectionHeaderContent}>
            <IconSymbol name="clock.fill" size={24} color="#10B981" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Jejak Aktivitas
            </ThemedText>
          </View>
          <IconSymbol 
            name={showActivities ? "chevron.up" : "chevron.down"} 
            size={16} 
            color="#10B981" 
          />
        </TouchableOpacity>

        {showActivities && (
          <View style={styles.activitiesContainer}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}15` }]}>
                  <IconSymbol name={activity.icon as any} size={20} color={activity.color} />
                </View>
                
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                    <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
                  </View>
                  <ThemedText style={styles.activityDescription}>{activity.description}</ThemedText>
                </View>
                
                <View style={[
                  styles.activityTypeBadge,
                  { backgroundColor: activity.type === 'exercise' ? '#E0F2FE' : '#FEF3C7' }
                ]}>
                  <ThemedText style={[
                    styles.activityTypeText,
                    { color: activity.type === 'exercise' ? '#0369A1' : '#92400E' }
                  ]}>
                    {activity.type === 'exercise' ? '🏃' : '💝'}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        )}
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
    transform: [{ rotate: '15deg' }],
  },
  heroContent: {
    zIndex: 1,
    paddingTop: width > 400 ? 40 : 30,
  },
  greeting: {
    fontSize: width > 400 ? 18 : 16,
    color: '#E0E7FF',
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
    color: '#E0E7FF',
    lineHeight: width > 400 ? 24 : 22,
    fontWeight: '400',
  },

  // Profile Header
  profileWrapper: {
    paddingHorizontal: width > 400 ? 24 : 20,
    marginTop: width > 400 ? 20 : 10,
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusText: {
    fontSize: 12,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },

  // Points Summary
  pointsSummaryWrapper: {
    paddingHorizontal: width > 400 ? 24 : 20,
    marginBottom: 24,
  },
  pointsSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  pointsSubtext: {
    fontSize: 12,
    color: '#A16207',
  },

  // Section
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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

  // Achievement Carousel
  achievementCarousel: {
    paddingHorizontal: 4,
    gap: 12,
  },
  achievementItem: {
    width: 120,
    height: 90,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    position: 'relative',
    marginRight: 12,
  },
  achievementTitle: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 14,
  },
  unlockedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Reflection Card
  reflectionWrapper: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  reflectionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  chatbotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C7D2FE',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  chatbotButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#6366F1',
    marginLeft: 10,
  },
  chatbotContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  chatbotDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  chatbotActionButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  chatbotActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Activity Timeline
  activitiesContainer: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  activityDescription: {
    fontSize: 13,
    color: '#64748B',
  },
  activityTypeBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  activityTypeText: {
    fontSize: 16,
  },

  bottomSpacing: {
    height: 32,
  },
});