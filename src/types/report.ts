// src/types/report.ts
export type ReportType = 'table' | 'chart' | 'summary';
export type ChartType = 'bar' | 'line' | 'pie' | 'area';
export type TimeRange = 'today' | 'week' | 'month' | 'year' | 'custom';

export interface ReportFilter {
  field: string;
  operator: 'eq' | 'gt' | 'lt' | 'contains' | 'between';
  value: any;
}

export interface ReportConfig {
  id: string;
  title: string;
  type: ReportType;
  dataSource: string;
  filters: ReportFilter[];
  columns?: {
    field: string;
    title: string;
    type: 'text' | 'number' | 'date' | 'boolean';
    format?: string;
  }[];
  chart?: {
    type: ChartType;
    xAxis: string;
    yAxis: string[];
    stacked?: boolean;
  };
  timeRange?: TimeRange;
  customRange?: {
    start: Date;
    end: Date;
  };
  refreshInterval?: number;
}

export interface ReportData {
  columns: string[];
  rows: any[];
  summary?: {
    [key: string]: number;
  };
  metadata?: {
    total: number;
    filtered: number;
    page: number;
    pageSize: number;
  };
}
