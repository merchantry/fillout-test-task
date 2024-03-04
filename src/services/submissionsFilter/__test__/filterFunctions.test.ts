import { Question } from '../../../types';
import { equals, doesNotEqual, greaterThan, lessThan } from '../filterFunctions';

const mockQuestion = (type: string, value: string | number | undefined): Question => ({
  id: '1',
  name: 'test',
  type,
  value,
});

describe('equals', () => {
  it('should return true if the value is equal to the filter value', () => {
    expect(equals(mockQuestion('ShortAnswer', 'test'), 'test')).toBeTruthy();
    expect(equals(mockQuestion('NumberInput', 1), 1)).toBeTruthy();
    expect(equals(mockQuestion('DatePicker', '2024-02-01'), '2024-02-01')).toBeTruthy();
  });

  it('should return false if the value is not equal to the filter value', () => {
    expect(equals(mockQuestion('ShortAnswer', 'test'), 'not test')).toBeFalsy();
    expect(equals(mockQuestion('NumberInput', 1), 2)).toBeFalsy();
    expect(equals(mockQuestion('DatePicker', '2024-02-01'), '2024-02-02')).toBeFalsy();
  });
});

describe('doesNotEqual', () => {
  it('should return true if the value is not equal to the filter value', () => {
    expect(doesNotEqual(mockQuestion('ShortAnswer', 'test'), 'not test')).toBeTruthy();
    expect(doesNotEqual(mockQuestion('NumberInput', 1), 2)).toBeTruthy();
    expect(doesNotEqual(mockQuestion('DatePicker', '2024-02-01'), '2024-02-02')).toBeTruthy();
  });

  it('should return false if the value is equal to the filter value', () => {
    expect(doesNotEqual(mockQuestion('ShortAnswer', 'test'), 'test')).toBeFalsy();
    expect(doesNotEqual(mockQuestion('NumberInput', 1), 1)).toBeFalsy();
    expect(doesNotEqual(mockQuestion('DatePicker', '2024-02-01'), '2024-02-01')).toBeFalsy();
  });
});

describe('greaterThan', () => {
  it('should return true if the value is greater than the filter value', () => {
    expect(greaterThan(mockQuestion('NumberInput', 2), 1)).toBeTruthy();
    expect(greaterThan(mockQuestion('DatePicker', '2024-02-02'), '2024-02-01')).toBeTruthy();
  });

  it('should return false if the value is not greater than the filter value', () => {
    expect(greaterThan(mockQuestion('NumberInput', 1), 2)).toBeFalsy();
    expect(greaterThan(mockQuestion('DatePicker', '2024-02-01'), '2024-02-02')).toBeFalsy();
  });
});

describe('lessThan', () => {
  it('should return true if the value is less than the filter value', () => {
    expect(lessThan(mockQuestion('NumberInput', 1), 2)).toBeTruthy();
    expect(lessThan(mockQuestion('DatePicker', '2024-02-01'), '2024-02-02')).toBeTruthy();
  });

  it('should return false if the value is not less than the filter value', () => {
    expect(lessThan(mockQuestion('NumberInput', 2), 1)).toBeFalsy();
    expect(lessThan(mockQuestion('DatePicker', '2024-02-02'), '2024-02-01')).toBeFalsy();
  });
});
