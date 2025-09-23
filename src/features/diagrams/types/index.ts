export interface ChartData {
  bar: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  };
  line: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  };
  area: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  };
  pie: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  };
  horizontal: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  };
  radial: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    series: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  };
}

export interface ChartItem {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'area' | 'donut' | 'radialBar';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  height?: number;
}
