export interface SimulationConfig {
  simResolution: number;
  dyeResolution: number;
  captureResolution: number;
  densityDissipation: number;
  velocityDissipation: number;
  pressure: number;
  pressureIterations: number;
  curl: number;
  splatRadius: number;
  splatForce: number;
  shading: boolean;
  colorful: boolean;
  colorUpdateSpeed: number;
  colorPalette: string[];
  hover: boolean;
  backgroundColor: string;
  transparent: boolean;
  brightness: number;
  bloom: boolean;
  bloomIterations: number;
  bloomResolution: number;
  bloomIntensity: number;
  bloomThreshold: number;
  bloomSoftKnee: number;
}

const defaultConfig: SimulationConfig = {
  simResolution: 128,
  dyeResolution: 1024,
  captureResolution: 512,
  densityDissipation: 1,
  velocityDissipation: 0.2,
  pressure: 0.8,
  pressureIterations: 20,
  curl: 30,
  splatRadius: 0.25,
  splatForce: 6000,
  shading: true,
  colorful: true,
  colorUpdateSpeed: 10,
  colorPalette: [],
  hover: true,
  backgroundColor: '#000000',
  transparent: false,
  brightness: 0.5,
  bloom: true,
  bloomIterations: 8,
  bloomResolution: 256,
  bloomIntensity: 0.8,
  bloomThreshold: 0.6,
  bloomSoftKnee: 0.7
};

export { defaultConfig };
