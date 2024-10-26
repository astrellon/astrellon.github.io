import Signal from "simple-signals";

export const hoverOverElement = new Signal<HTMLElement>();
export const hoverOutElement = new Signal<HTMLElement>();