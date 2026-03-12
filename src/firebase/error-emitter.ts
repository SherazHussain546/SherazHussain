'use client';

type Listener = (error: any) => void;

/**
 * A lightweight event emitter for centralizing Firebase errors.
 */
class ErrorEmitter {
  private listeners: { [event: string]: Listener[] } = {};

  on(event: string, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event: string, listener: Listener) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
  }

  emit(event: string, error: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(l => l(error));
  }
}

export const errorEmitter = new ErrorEmitter();
