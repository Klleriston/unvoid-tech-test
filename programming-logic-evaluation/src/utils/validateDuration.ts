export function isValidateDuration(duration: number): boolean {
  return typeof duration === 'number' && duration > 0;
}
