import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useFocusEffect } from '@react-navigation/native';
import { SuccessModal } from '@/components/SuccessModal';

const { width } = Dimensions.get('window');
const API_BASE_URL = 'http://localhost:3000/api';

interface DonationItem {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  color: string;
  category: string;
  impact: string;
}

export default function DonasiScreen() {
  const [userPoints, setUserPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      setUserPoints(points);
    } catch (error) {
      console.error('Error fetching user points:', error);
      setUserPoints(0);
    }
  };

  const donationItems: DonationItem[] = [
    {
      id: '1',
      title: 'Air Bersih untuk Palestina',
      description: 'Sediakan akses air bersih untuk keluarga di Gaza',
      points: 500,
      icon: 'drop.fill',
      color: '#3B82F6',
      category: 'Kemanusiaan',
      impact: '500 Liter Air Steril'
    },
    {
      id: '2', 
      title: 'Tanam Pohon Mangrove',
      description: 'Restorasi ekosistem pesisir Indonesia',
      points: 750,
      icon: 'leaf.fill',
      color: '#10B981',
      category: 'Lingkungan',
      impact: '5 bibit pohon mangrove'
    },
    {
      id: '3',
      title: 'Makanan untuk Anak Yatim',
      description: 'Berikan nutrisi untuk anak-anak kurang mampu',
      points: 300,
      icon: 'heart.fill',
      color: '#EF4444',
      category: 'Sosial',
      impact: '1 Paket Sembako Lengkap'
    },
    {
      id: '4',
      title: 'Alat Tulis untuk Anak di Pelosok Negeri',
      description: 'Dukung pendidikan anak-anak di daerah terpencil',
      points: 1200,
      icon: 'book.fill',
      color: '#8B5CF6',
      category: 'Pendidikan',
      impact: '1 Tas & Alat Tulis'
    },
    {
      id: '5',
      title: 'Kotak Obat Darurat',
      description: 'Obat-obatan untuk korban bencana alam di Aceh',
      points: 700,
      icon: 'cross.fill',
      color: '#F59E0B',
      category: 'Kesehatan',
      impact: '1 Kotak P3K Lengkap'
    }
  ];

  const handleDonation = async (item: DonationItem) => {
    if (userPoints < item.points) {
      Alert.alert(
        "Poin Tidak Cukup 😔",
        `Kamu membutuhkan ${item.points} poin, tapi hanya punya ${userPoints} poin.\n\nYuk, kumpulkan lebih banyak Aset Kebaikan dengan berolahraga! 💪`
      );
      return;
    }

    Alert.alert(
      "🎉 Konfirmasi Donasi",
      `Yakin ingin menukar ${item.points} poin untuk:\n\n${item.title}\n\nDampak: ${item.impact}`,
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Ya, Donasi!", 
          onPress: () => processDonation(item)
        }
      ]
    );
  };

  const processDonation = async (item: DonationItem) => {
    setIsLoading(true);
    try {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      
      // Get current points
      const pointsStr = await AsyncStorage.getItem('user_points');
      const currentPoints = pointsStr ? parseInt(pointsStr) : 0;
      
      if (currentPoints < item.points) {
        Alert.alert("Error", "Poin tidak mencukupi");
        return;
      }
      
      // Deduct points
      const newPoints = currentPoints - item.points;
      await AsyncStorage.setItem('user_points', newPoints.toString());
      
      setUserPoints(newPoints);
      
      // Show beautiful success modal instead of alert
      console.log('Setting showSuccessModal to true');
      
      // First show a simple alert to test
      Alert.alert(
        "🎉 Luar Biasa!",
        "Luar biasa! Upayamu hari ini telah berhasil dikonversi menjadi poin. Jangan lihat besar kecilnya angka, tapi lihatlah besarnya niatmu untuk sehat dan berbagi.",
        [
          {
            text: "Terima Kasih 🙏",
            onPress: () => {
              setShowSuccessModal(true);
            }
          }
        ]
      );
      
    } catch (error: any) {
      Alert.alert("Error", "Gagal memproses donasi");
    } finally {
      setIsLoading(false);
    }
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
            name="gift.fill"
            size={width > 400 ? 140 : 120}
            color="rgba(255,255,255,0.2)"
            style={styles.heroIcon}
          />
        </View>
        
        <View style={styles.heroContent}>
          <ThemedText style={styles.greeting}>Saatnya Berbagi Kebaikan! 🎁</ThemedText>
          <ThemedText type="title" style={styles.heroTitle}>Lapak Berkah</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Tukar Aset Kebaikanmu menjadi dampak nyata untuk sesama
          </ThemedText>
        </View>
      </View>

      {/* Points Card */}
      <View style={styles.pointsCardWrapper}>
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <IconSymbol name="star.fill" size={28} color="#F59E0B" />
            <ThemedText style={styles.pointsLabel}>Aset Kebaikan Tersedia</ThemedText>
          </View>
          <ThemedText style={styles.pointsValue}>
            {userPoints.toLocaleString('id-ID')} Poin
          </ThemedText>
        </View>
      </View>

      {/* Donation Items */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="hands.sparkles.fill" size={24} color="#EF4444" />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Pilihan Kebaikan
          </ThemedText>
        </View>

        {donationItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.donationCard}
            onPress={() => handleDonation(item)}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
              {item.id === '1' ? (
                <Image 
                  source={require('@/assets/images/air.jpg')} 
                  style={styles.donationImage}
                  resizeMode="cover"
                />
              ) : item.id === '2' ? (
                <Image 
                  source={require('@/assets/images/mangroves.jpg')} 
                  style={styles.donationImage}
                  resizeMode="cover"
                />
              ) : item.id === '3' ? (
                <Image 
                  source={require('@/assets/images/sembako.jpg')} 
                  style={styles.donationImage}
                  resizeMode="cover"
                />
              ) : item.id === '4' ? (
                <Image 
                  source={require('@/assets/images/tas.jpg')} 
                  style={styles.donationImage}
                  resizeMode="cover"
                />
              ) : item.id === '5' ? (
                <Image 
                  source={require('@/assets/images/kotakp3k.jpg')} 
                  style={styles.donationImage}
                  resizeMode="cover"
                />
              ) : (
                <IconSymbol name={item.icon as any} size={32} color={item.color} />
              )}
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
                <View style={[styles.categoryBadge, { backgroundColor: `${item.color}20` }]}>
                  <ThemedText style={[styles.categoryText, { color: item.color }]}>
                    {item.category}
                  </ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.cardDescription}>{item.description}</ThemedText>
              
              <View style={styles.cardFooter}>
                <View style={styles.impactContainer}>
                  <ThemedText style={styles.impactLabel}>Dampak:</ThemedText>
                  <ThemedText style={styles.impactText}>{item.impact}</ThemedText>
                </View>
                
                <View style={styles.pointsContainer}>
                  <ThemedText style={styles.pointsRequired}>{item.points} Poin</ThemedText>
                  <View style={[
                    styles.actionButton,
                    { backgroundColor: userPoints >= item.points ? item.color : '#94A3B8' }
                  ]}>
                    <ThemedText style={styles.actionButtonText}>
                      {userPoints >= item.points ? 'Tukar' : 'Kurang'}
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Test Modal Button - Remove this after testing */}
      <View style={{ padding: 20 }}>
        <TouchableOpacity 
          style={{ backgroundColor: '#EF4444', padding: 15, borderRadius: 10 }}
          onPress={() => {
            console.log('Test button pressed');
            setShowSuccessModal(true);
          }}
        >
          <ThemedText style={{ color: 'white', textAlign: 'center' }}>Test Modal</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
      
      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="🎉 Luar Biasa!"
          message="Luar biasa! Upayamu hari ini telah berhasil dikonversi menjadi poin. Jangan lihat besar kecilnya angka, tapi lihatlah besarnya niatmu untuk sehat dan berbagi."
        />
      )}
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
    backgroundColor: '#EF4444',
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
    color: '#FEE2E2',
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
    color: '#FEE2E2',
    lineHeight: width > 400 ? 24 : 22,
    fontWeight: '400',
  },

  // Points Card
  pointsCardWrapper: {
    paddingHorizontal: width > 400 ? 24 : 20,
    marginTop: width > 400 ? 20 : 10,
    marginBottom: width > 400 ? 32 : 24,
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F59E0B',
    letterSpacing: -1,
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },

  // Donation Cards
  donationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  donationImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    gap: 8,
  },
  impactContainer: {
    marginBottom: 8,
  },
  impactLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  impactText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsRequired: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  bottomSpacing: {
    height: 32,
  },
});