import { StyleSheet, TextInput, TouchableOpacity, Alert, View, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');

export default function InputScreen() {
  const [langkah, setLangkah] = useState('');
  const [kalori, setKalori] = useState('');
  const [durasi, setDurasi] = useState('');
  const [showFormula, setShowFormula] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const calculateAssetValue = (steps: number, calories: number, duration: number) => {
    // Formula konversi: 1000 langkah = 100 poin aset kebaikan
    const stepPoints = Math.floor(steps / 10);
    const caloriePoints = calories * 2;
    const durationPoints = duration * 5;
    return stepPoints + caloriePoints + durationPoints;
  };

  const handleSimpan = () => {
    const nilaiLangkah = parseInt(langkah) || 0;
    const nilaiKalori = parseInt(kalori) || 0;
    const nilaiDurasi = parseInt(durasi) || 0;
    
    if (!nilaiLangkah && !nilaiKalori && !nilaiDurasi) {
      Alert.alert("Oops!", "Masukkan minimal satu aktivitas fisik untuk dikonversi menjadi Aset Kebaikan! 💪");
      return;
    }
    
    // Verifikasi Nurani - deteksi nilai yang tidak wajar
    if (nilaiLangkah > 50000) {
      Alert.alert("Verifikasi Nurani 🤔", "Langkah terlalu tinggi! Mari berlatih jujur untuk investasi kebaikan yang bermakna.");
      return;
    }
    if (nilaiKalori > 5000) {
      Alert.alert("Verifikasi Nurani 🤔", "Kalori terlalu tinggi! Pastikan input sesuai dengan aktivitas yang benar-benar dilakukan.");
      return;
    }
    if (nilaiDurasi > 600) {
      Alert.alert("Verifikasi Nurani 🤔", "Durasi terlalu lama! Mari input yang realistis untuk investasi kebaikan.");
      return;
    }
    
    const totalAset = calculateAssetValue(nilaiLangkah, nilaiKalori, nilaiDurasi);
    Alert.alert(
      "🎉 Investasi Berhasil!", 
      `Keringatmu telah dikonversi menjadi:\n\n💎 ${totalAset.toLocaleString('id-ID')} Aset Kebaikan\n\nSetiap tetes keringat adalah investasi untuk aksi sosial yang bermakna!`
    );
    
    // Reset form
    setLangkah('');
    setKalori('');
    setDurasi('');
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
          <ThemedText style={styles.greeting}>Satu Langkah, Seribu Harapan, Semangat! 💪</ThemedText>
          <ThemedText type="title" style={styles.heroTitle}>Aset Kebaikan</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Yuk, sulap lelahmu hari ini jadi alasan orang lain tersenyum
          </ThemedText>
        </View>
      </View>

      {/* Info Card */}
      <View style={styles.infoCardWrapper}>
        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.infoButton} 
            onPress={() => setShowInfo(!showInfo)}
          >
            <IconSymbol name="lightbulb.fill" size={20} color="#F59E0B" />
            <ThemedText style={styles.infoButtonText}>Apa itu aset kebaikan???</ThemedText>
            <IconSymbol 
              name={showInfo ? "chevron.up" : "chevron.down"} 
              size={16} 
              color="#F59E0B" 
            />
          </TouchableOpacity>
          
          {showInfo && (
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoText}>
                Di sini, setiap kalori yang kamu bakar berubah menjadi bantuan nyata. Kamu bergerak untuk sehat, dan di saat yang sama, kamu bergerak untuk membantu dunia. Sederhana, transparan, dan dimulai dari langkah kakimu sendiri loh! 🌟
              </ThemedText>
            </View>
          )}
        </View>
      </View>

      {/* Input Form */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="plus.circle.fill" size={24} color="#00B4D8" />
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Input Aktivitas Fisik
          </ThemedText>
        </View>

        {/* Langkah Input */}
        <View style={styles.inputGroup}>
          <View style={styles.inputHeader}>
            <IconSymbol name="figure.walk" size={20} color="#00B4D8" />
            <ThemedText style={styles.inputLabel}>Jumlah Langkah</ThemedText>
          </View>
          <TextInput 
            style={styles.input}
            placeholder="Jejak langkahmu hari ini"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={langkah}
            onChangeText={setLangkah}
          />
        </View>

        {/* Kalori Input */}
        <View style={styles.inputGroup}>
          <View style={styles.inputHeader}>
            <IconSymbol name="flame.fill" size={20} color="#FF6B6B" />
            <ThemedText style={styles.inputLabel}>Kalori Terbakar</ThemedText>
          </View>
          <TextInput 
            style={styles.input}
            placeholder="Energi yang kau dedikasikan untuk sesama."
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={kalori}
            onChangeText={setKalori}
          />
        </View>

        {/* Durasi Input */}
        <View style={styles.inputGroup}>
          <View style={styles.inputHeader}>
            <IconSymbol name="clock.fill" size={20} color="#8B5CF6" />
            <ThemedText style={styles.inputLabel}>Durasi Olahraga (menit)</ThemedText>
          </View>
          <TextInput 
            style={styles.input}
            placeholder="Menit yang kamu perjuangkan"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={durasi}
            onChangeText={setDurasi}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSimpan}>
          <IconSymbol name="arrow.up.circle.fill" size={24} color="#FFFFFF" />
          <ThemedText style={styles.submitButtonText}>
            Konversi ke Aset Kebaikan
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Conversion Info */}
      <View style={styles.conversionCard}>
        <TouchableOpacity 
          style={styles.formulaButton} 
          onPress={() => setShowFormula(!showFormula)}
        >
          <IconSymbol name="chart.bar.fill" size={20} color="#10B981" />
          <ThemedText style={styles.formulaButtonText}>[ i ] Bagaimana Kami Menghargai Lelahmu</ThemedText>
          <IconSymbol 
            name={showFormula ? "chevron.up" : "chevron.down"} 
            size={16} 
            color="#10B981" 
          />
        </TouchableOpacity>
        
        {showFormula && (
          <View style={styles.conversionList}>
            <View style={styles.conversionItem}>
              <ThemedText style={styles.conversionText}>• 1.000 langkah = 100 poin</ThemedText>
            </View>
            <View style={styles.conversionItem}>
              <ThemedText style={styles.conversionText}>• 1 kalori = 2 poin</ThemedText>
            </View>
            <View style={styles.conversionItem}>
              <ThemedText style={styles.conversionText}>• 1 menit = 5 poin</ThemedText>
            </View>
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
    backgroundColor: '#10B981',
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

  // Info Card
  infoCardWrapper: {
    paddingHorizontal: width > 400 ? 24 : 20,
    marginTop: width > 400 ? 20 : 10,
    marginBottom: width > 400 ? 32 : 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FDE68A',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  infoButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 10,
  },
  infoContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  infoText: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
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

  // Input Groups
  inputGroup: {
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    color: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    minHeight: 60,
  },

  // Submit Button
  submitButton: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
    minHeight: 64,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  // Conversion Card
  conversionCard: {
    marginHorizontal: 20,
    backgroundColor: '#F0F9FF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  formulaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#A7F3D0',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  formulaButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#0C4A6E',
    marginLeft: 10,
  },
  conversionList: {
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#BAE6FD',
  },
  conversionItem: {
    paddingVertical: 4,
  },
  conversionText: {
    fontSize: 14,
    color: '#0369A1',
    fontWeight: '500',
  },

  bottomSpacing: {
    height: 32,
  },
});