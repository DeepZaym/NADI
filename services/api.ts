import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_POINTS: 'user_points',
  ACTIVITIES: 'activities',
  USER_DATA: 'user_data'
};

export interface Activity {
  id: string;
  userId: number;
  steps: number;
  calories: number;
  duration: number;
  pointsEarned: number;
  createdAt: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  totalPoints: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Get user data
  async getUser(userId: number): Promise<UserData> {
    await delay(500);
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userData) {
        return JSON.parse(userData);
      }
      // Default user data
      const defaultUser: UserData = {
        id: userId,
        name: 'DeepZaym',
        email: 'user@example.com',
        totalPoints: 0
      };
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(defaultUser));
      return defaultUser;
    } catch (error) {
      throw new Error('Failed to get user data');
    }
  },

  // Submit activity
  async submitActivity(data: {
    userId: number;
    steps: number;
    calories: number;
    duration: number;
  }): Promise<{
    success: boolean;
    activity: Activity;
    totalPoints: number;
    message: string;
  }> {
    await delay(1000);

    // Validation (Verifikasi Nurani)
    if (data.steps > 50000) {
      throw new Error('Langkah terlalu tinggi! Mari berlatih jujur untuk investasi kebaikan yang bermakna.');
    }
    if (data.calories > 5000) {
      throw new Error('Kalori terlalu tinggi! Pastikan input sesuai dengan aktivitas yang benar-benar dilakukan.');
    }
    if (data.duration > 600) {
      throw new Error('Durasi terlalu lama! Mari input yang realistis untuk investasi kebaikan.');
    }

    // Calculate points
    const stepPoints = Math.floor(data.steps / 10);
    const caloriePoints = data.calories * 2;
    const durationPoints = data.duration * 5;
    const pointsEarned = stepPoints + caloriePoints + durationPoints;

    // Create activity
    const activity: Activity = {
      id: Date.now().toString(),
      userId: data.userId,
      steps: data.steps,
      calories: data.calories,
      duration: data.duration,
      pointsEarned,
      createdAt: new Date().toISOString()
    };

    try {
      // Save activity
      const existingActivities = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      const activities: Activity[] = existingActivities ? JSON.parse(existingActivities) : [];
      activities.push(activity);
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));

      // Update user points
      const userData = await this.getUser(data.userId);
      userData.totalPoints += pointsEarned;
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

      return {
        success: true,
        activity,
        totalPoints: userData.totalPoints,
        message: `🎉 ${pointsEarned.toLocaleString('id-ID')} Aset Kebaikan berhasil diperoleh!`
      };
    } catch (error) {
      throw new Error('Failed to save activity');
    }
  },

  // Process donation
  async processDonation(data: {
    userId: number;
    donationId: string;
    points: number;
    title: string;
  }): Promise<{
    success: boolean;
    remainingPoints: number;
    message: string;
  }> {
    await delay(800);

    try {
      const userData = await this.getUser(data.userId);
      
      if (userData.totalPoints < data.points) {
        throw new Error('Poin tidak mencukupi');
      }

      // Deduct points
      userData.totalPoints -= data.points;
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

      return {
        success: true,
        remainingPoints: userData.totalPoints,
        message: 'Donasi berhasil diproses'
      };
    } catch (error) {
      throw new Error('Failed to process donation');
    }
  }
};