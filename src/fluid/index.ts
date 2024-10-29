import { Simulation } from './simulation';
import type { Config } from './types';

class WebGLFluidEnhanced {
  private container: HTMLElement;
  private simulation: Simulation;
  constructor(container: HTMLElement = document.body) {
    this.container = container;
    this.container.style.outline = 'none';
    this.container.style.display = 'flex';
    this.container.style.justifyContent = 'center';
    this.container.style.alignItems = 'center';

    this.simulation = new Simulation(container);
  }

  public start() {
    if (this.simulation.hasStarted) return;
    this.simulation.start();
  }

  public stop() {
    if (!this.simulation.hasStarted) return;
    this.simulation.stop();
  }

  public togglePause(drawWhilePaused = false): boolean {
    if (!this.simulation.hasStarted) return false;
    this.simulation.paused = !this.simulation.paused;
    if (this.simulation.paused) {
      this.simulation.drawWhilePaused = drawWhilePaused;
    }
    return this.simulation.paused;
  }

  public setConfig(config: Config) {
    for (const prop in config) {
        this.simulation[prop] = config[prop];
    }

    if (!this.simulation.hasStarted) return;

    if (
      config.dyeResolution !== undefined ||
      config.simResolution !== undefined
    ) {
      this.simulation.initFramebuffers();
    }

    if (
      config.shading !== undefined ||
      config.bloom !== undefined
    ) {
      this.simulation.updateKeywords();
    }
  }
}

export * from './config';
export default WebGLFluidEnhanced;
