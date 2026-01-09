export class CosmicError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'CosmicError';
  }
}
