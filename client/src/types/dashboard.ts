export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DashboardSection {
  items: DashboardItem[];
} 