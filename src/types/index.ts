export type CityForDelivery = {
  id: string;
  city: string;
  cost: number;
  updated_at: string;
};

export type FinalBetRangeType = {
  id: string;
  min: number;
  max: number;
  updated_at: string;
  feeAmount?: number;
  feeAmountInPercent?: number;
};

export type BetInRealTimeType = {
  id: string;
  min: number;
  max: number;
  bet: number;
  updated_at: string;
};

export type CityAndPortType = {
  id: string;
  City: string;
  SAVANNAH: string;
  CA: string;
  NY: string;
  TX: string;
  updated_at: string;
  created_at: string;
};
