export class gpxType {
  public name: string;
  public path: string;
  public shown: boolean;
}

export class GpxEnum {
  static SCHOONDERBUKEN: gpxType = {
    name: 'schoonderbuken-63km',
    path: '',
    shown: true
  };
  static WILLEBRINGEN: gpxType = {
    name: 'willebringen-63km',
    path: '',
    shown: false
  };
}

export const gpxArray: gpxType[] = [
  GpxEnum.SCHOONDERBUKEN,
  GpxEnum.WILLEBRINGEN,
];
