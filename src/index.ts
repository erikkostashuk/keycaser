/**
 * Converts a snake_case string to camelCase
 * @param str - The snake_case string to convert
 * @returns The camelCase version of the string
 * @example
 * toCamelCase('user_name') // returns 'userName'
 */
export function toCamelCase(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str.replace(/_([a-z])/gi, (_, letter) => letter.toUpperCase());
}

/**
 * Converts a camelCase string to snake_case
 * @param str - The camelCase string to convert
 * @returns The snake_case version of the string
 * @example
 * toSnakeCase('userName') // returns 'user_name'
 */
export function toSnakeCase(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, '');
}

/**
 * Type guard to check if a value is a plain object
 * @param value - The value to check
 * @returns True if the value is a plain object, false otherwise
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Recursively converts all object keys to camelCase
 * @param input - The input value (can be any type)
 * @returns The input with all object keys converted to camelCase
 * @example
 * camelCaseKeys({ user_name: 'John', is_active: true })
 * // returns { userName: 'John', isActive: true }
 */
export function camelCaseKeys<T = any>(input: T): T {
  if (input === null || input === undefined) {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(item => camelCaseKeys(item)) as unknown as T;
  }
  
  if (isObject(input)) {
    const result: Record<string, unknown> = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        try {
          const camelKey = toCamelCase(key);
          result[camelKey] = camelCaseKeys((input as Record<string, unknown>)[key]);
        } catch (e) {
          // If key conversion fails, keep original key
          result[key] = camelCaseKeys((input as Record<string, unknown>)[key]);
        }
      }
    }
    return result as T;
  }
  
  return input;
}

/**
 * Recursively converts all object keys to snake_case
 * @param input - The input value (can be any type)
 * @returns The input with all object keys converted to snake_case
 * @example
 * snakeCaseKeys({ userName: 'John', isActive: true })
 * // returns { user_name: 'John', is_active: true }
 */
export function snakeCaseKeys<T = any>(input: T): T {
  if (input === null || input === undefined) {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(item => snakeCaseKeys(item)) as unknown as T;
  }
  
  if (isObject(input)) {
    const result: Record<string, unknown> = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        try {
          const snakeKey = toSnakeCase(key);
          result[snakeKey] = snakeCaseKeys((input as Record<string, unknown>)[key]);
        } catch (e) {
          // If key conversion fails, keep original key
          result[key] = snakeCaseKeys((input as Record<string, unknown>)[key]);
        }
      }
    }
    return result as T;
  }
  
  return input;
}