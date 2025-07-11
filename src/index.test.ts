import { camelCaseKeys, snakeCaseKeys } from './index';

describe('camelCaseKeys', () => {
  it('should convert simple object keys to camelCase', () => {
    const input = {
      user_name: 'John',
      first_name: 'John',
      last_name: 'Doe',
    };
    const expected = {
      userName: 'John',
      firstName: 'John',
      lastName: 'Doe',
    };
    expect(camelCaseKeys(input)).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const input = {
      user_profile: {
        user_name: 'john_doe',
        contact_info: {
          email_address: 'john@example.com',
          phone_number: '555-1234',
        },
      },
    };
    const expected = {
      userProfile: {
        userName: 'john_doe',
        contactInfo: {
          emailAddress: 'john@example.com',
          phoneNumber: '555-1234',
        },
      },
    };
    expect(camelCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = [
      { user_name: 'John', user_id: 1 },
      { user_name: 'Jane', user_id: 2 },
    ];
    const expected = [
      { userName: 'John', userId: 1 },
      { userName: 'Jane', userId: 2 },
    ];
    expect(camelCaseKeys(input)).toEqual(expected);
  });

  it('should handle mixed arrays', () => {
    const input = {
      user_list: [
        { user_name: 'John' },
        'string_value',
        123,
        null,
        { nested_object: { inner_key: 'value' } },
      ],
    };
    const expected = {
      userList: [
        { userName: 'John' },
        'string_value',
        123,
        null,
        { nestedObject: { innerKey: 'value' } },
      ],
    };
    expect(camelCaseKeys(input)).toEqual(expected);
  });

  it('should preserve non-object values', () => {
    expect(camelCaseKeys('string')).toBe('string');
    expect(camelCaseKeys(123)).toBe(123);
    expect(camelCaseKeys(null)).toBe(null);
    expect(camelCaseKeys(undefined)).toBe(undefined);
    expect(camelCaseKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(camelCaseKeys({})).toEqual({});
    expect(camelCaseKeys([])).toEqual([]);
  });

  it('should handle keys that are already in camelCase', () => {
    const input = {
      userName: 'John',
      firstName: 'John',
      some_other_key: 'value',
    };
    const expected = {
      userName: 'John',
      firstName: 'John',
      someOtherKey: 'value',
    };
    expect(camelCaseKeys(input)).toEqual(expected);
  });
});

describe('snakeCaseKeys', () => {
  it('should convert simple object keys to snake_case', () => {
    const input = {
      userName: 'John',
      firstName: 'John',
      lastName: 'Doe',
    };
    const expected = {
      user_name: 'John',
      first_name: 'John',
      last_name: 'Doe',
    };
    expect(snakeCaseKeys(input)).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const input = {
      userProfile: {
        userName: 'john_doe',
        contactInfo: {
          emailAddress: 'john@example.com',
          phoneNumber: '555-1234',
        },
      },
    };
    const expected = {
      user_profile: {
        user_name: 'john_doe',
        contact_info: {
          email_address: 'john@example.com',
          phone_number: '555-1234',
        },
      },
    };
    expect(snakeCaseKeys(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const input = [
      { userName: 'John', userId: 1 },
      { userName: 'Jane', userId: 2 },
    ];
    const expected = [
      { user_name: 'John', user_id: 1 },
      { user_name: 'Jane', user_id: 2 },
    ];
    expect(snakeCaseKeys(input)).toEqual(expected);
  });

  it('should handle mixed arrays', () => {
    const input = {
      userList: [
        { userName: 'John' },
        'stringValue',
        123,
        null,
        { nestedObject: { innerKey: 'value' } },
      ],
    };
    const expected = {
      user_list: [
        { user_name: 'John' },
        'stringValue',
        123,
        null,
        { nested_object: { inner_key: 'value' } },
      ],
    };
    expect(snakeCaseKeys(input)).toEqual(expected);
  });

  it('should preserve non-object values', () => {
    expect(snakeCaseKeys('string')).toBe('string');
    expect(snakeCaseKeys(123)).toBe(123);
    expect(snakeCaseKeys(null)).toBe(null);
    expect(snakeCaseKeys(undefined)).toBe(undefined);
    expect(snakeCaseKeys(true)).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(snakeCaseKeys({})).toEqual({});
    expect(snakeCaseKeys([])).toEqual([]);
  });

  it('should handle keys that are already in snake_case', () => {
    const input = {
      user_name: 'John',
      first_name: 'John',
      someOtherKey: 'value',
    };
    const expected = {
      user_name: 'John',
      first_name: 'John',
      some_other_key: 'value',
    };
    expect(snakeCaseKeys(input)).toEqual(expected);
  });

  it('should handle consecutive capital letters', () => {
    const input = {
      XMLHttpRequest: 'value',
      HTTPSConnection: 'value',
      IOError: 'value',
    };
    const expected = {
      x_m_l_http_request: 'value',
      h_t_t_p_s_connection: 'value',
      i_o_error: 'value',
    };
    expect(snakeCaseKeys(input)).toEqual(expected);
  });
});

describe('Round-trip conversion', () => {
  it('should maintain data integrity when converting back and forth', () => {
    const original = {
      userName: 'John',
      userProfile: {
        contactInfo: {
          emailAddress: 'john@example.com',
          phoneNumbers: ['555-1234', '555-5678'],
        },
      },
    };
    
    const snakeCase = snakeCaseKeys(original);
    const backToCamel = camelCaseKeys(snakeCase);
    
    expect(backToCamel).toEqual(original);
  });
});