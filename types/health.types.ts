export interface HealthStats {
  steps: number;
  calories: number;
  goodPoints: number;
  growthPercent: number;
}

export interface MetricData {
  icon: string;
  value: number;
  label: string;
  color: string;
}