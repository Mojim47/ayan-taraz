// src/types/analytics.ts
export interface AnalyticsData {
  visitors: {
    total: number;
    unique: number;
    newUsers: number;
    returningUsers: number;
    avgSessionDuration: number;
    bounceRate: number;
  };
  pageViews: {
    total: number;
    perPage: { [key: string]: number };
    mostVisited: Array<{ path: string; views: number }>;
  };
  revenue: {
    total: number;
    today: number;
    thisMonth: number;
    lastMonth: number;
    byService: Array<{ service: string; amount: number }>;
  };
  users: {
    total: number;
    active: number;
    newToday: number;
    growth: number;
    byLocation: Array<{ city: string; count: number }>;
  };
  consultations: {
    total: number;
    completed: number;
    canceled: number;
    pending: number;
    satisfaction: number;
  };
}

export interface TimeRange {
  start: Date;
  end: Date;
}
