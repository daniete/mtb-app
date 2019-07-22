export class gpxType {
  public name: string;
  public path: string;
  public shown: boolean;
  public layer: any;
  public isDragDropLayer: boolean;

  constructor(name, path, shown, layer, isDragDropLayer = false) {
    this.name = name;
    this.path = path;
    this.shown = shown;
    this.layer = layer;
    this.isDragDropLayer = isDragDropLayer;
  }
}

export class GpxEnum {
  static GRANCANARIA : gpxType[] = [
  {
    name: 'schoonderbuken-63km',
    path: '',
    shown: true,
    layer: null,
    isDragDropLayer: false
  }, {
    name: 'willebringen-63km',
    path: '',
    shown: false,
    layer: null,
    isDragDropLayer: false
  }
];
  static GRANCANARIA2 : gpxType[] = [{
      name: 'Testritje',
      path: '',
      shown: true,
      layer: null,
      isDragDropLayer: false
    }
  ];
}
