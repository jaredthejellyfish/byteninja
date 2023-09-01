/**
 * Checks if all values in the 'from' object exist in the 'to' object.
 *
 * @param {object} from - The source object.
 * @param {object} to - The target object.
 * @returns {boolean} Returns true if all values in 'from' are present in 'to', otherwise returns false.
 */
export function areValuesEqual(from: object, to: object): boolean {
  return Object.values(from).every((value) =>
    Object.values(to).includes(value),
  );
}
