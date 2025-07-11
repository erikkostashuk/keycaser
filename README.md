# keycaser

Recursively convert object keys to camelCase or snake_case

## Installation

```bash
npm i keycaser
```

## Usage

```typescript
import { camelCaseKeys, snakeCaseKeys, toCamelCase, toSnakeCase } from 'keycaser';

// Convert to camelCase
const input = {
  user_name: 'John Doe',
  is_active: true,
  user_settings: {
    email_notifications: true,
    sms_alerts: false
  }
};

const camelCased = camelCaseKeys(input);
console.log(camelCased);
// Output:
// {
//   userName: 'John Doe',
//   isActive: true,
//   userSettings: {
//     emailNotifications: true,
//     smsAlerts: false
//   }
// }

// Convert to snake_case
const camelInput = {
  userName: 'Jane Doe',
  isActive: false,
  userSettings: {
    emailNotifications: false,
    smsAlerts: true
  }
};

const snakeCased = snakeCaseKeys(camelInput);
console.log(snakeCased);
// Output:
// {
//   user_name: 'Jane Doe',
//   is_active: false,
//   user_settings: {
//     email_notifications: false,
//     sms_alerts: true
//   }
// }
```

## API

### `camelCaseKeys<T>(input: T): T`

Recursively converts all object keys in the input to camelCase.

- **input**: Any value (object, array, or primitive)
- **returns**: The input with all object keys converted to camelCase

### `snakeCaseKeys<T>(input: T): T`

Recursively converts all object keys in the input to snake_case.

- **input**: Any value (object, array, or primitive)
- **returns**: The input with all object keys converted to snake_case

### `toCamelCase(str: string): string`

Converts a snake_case string to camelCase.

- **str**: The snake_case string to convert
- **returns**: The camelCase version of the string
- **throws**: TypeError if input is not a string

### `toSnakeCase(str: string): string`

Converts a camelCase string to snake_case.

- **str**: The camelCase string to convert
- **returns**: The snake_case version of the string
- **throws**: TypeError if input is not a string

## Features

- ✅ Zero dependencies
- ✅ TypeScript support
- ✅ Handles nested objects
- ✅ Handles arrays of objects
- ✅ Preserves non-object values
- ✅ Small and efficient

## License

MIT

---

☕ If you find this package helpful, consider buying me a coffee: [coff.ee/devwitherik](https://coff.ee/devwitherik)