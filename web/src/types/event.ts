export interface Event {
  name: string;
  startDate: string;
  endDate: string;
  id: string;
}

export interface EventDetail {
  name: string;
  startDate: string;
  endDate: string;
  overview: string;
  badgeImg: string;
  badgeName: string;
  targetImg: string;
  targetName: string;
  latitude: number;
  longitude: number;
  id: number;
}
