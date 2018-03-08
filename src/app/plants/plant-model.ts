export interface Plant {
  name: string;
  latinName: string;
  hearts: number;
  id?: string;
  time?: number;

  layer: string;
  height?: number;
  width?: number;
  minHardinessZone?: number;
  maxHardinessZone?: number;
  edible?: boolean;
  light?: string;
}
