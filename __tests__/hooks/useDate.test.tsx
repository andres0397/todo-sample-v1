import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useDate } from '../../src/hooks/useDate'; 

jest.useFakeTimers();

describe('useDate hook', () => {
  beforeEach(() => {
    jest.setSystemTime(new Date(2023, 9, 10, 15, 30).getTime()); // Set to October 10, 2023, 15:30
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the correct date, time, and greeting', () => {
    const { result } = renderHook(() => useDate());

    expect(result.current.formattedDate).toBe('Tuesday, 10 October\n\n');
    expect(result.current.formattedTime).toBe('3:30 PM');
    expect(result.current.greeting).toBe('Good Afternoon, ');
  });

  it('should update the date and time after one minute', () => {
    const { result } = renderHook(() => useDate());

    act(() => {
      jest.advanceTimersByTime(60 * 1000); // Advance time by one minute
    });

    expect(result.current.formattedDate).toBe('Tuesday, 10 October\n\n');
    expect(result.current.formattedTime).toBe('3:31 PM');
    expect(result.current.greeting).toBe('Good Afternoon, ');
  });
});
