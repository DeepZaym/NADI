import { useState, useEffect } from 'react';
import { HealthStats } from '@/types/health.types';

export const useHealthStats = () => {
  const [stats, setStats] = useState<HealthStats>({
    steps: 0,
    calories: 0,
    goodPoints: 0,
    growthPercent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthStats();
  }, []);

  const fetchHealthStats = async () => {
    try {
      // TODO: Replace dengan API call real
      // const response = await fetch('/api/health-stats');
      // const data = await response.json();
      
      // Mock data untuk sekarang
      setTimeout(() => {
        setStats({
          steps: 5432,
          calories: 320,
          goodPoints: 1250,
          growthPercent: 12,
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch health stats:', error);
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchHealthStats };
};