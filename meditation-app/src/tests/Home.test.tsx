import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Timer from '../pages/Home'; // Adjust path as necessary

jest.useFakeTimers();

describe('Timer Component', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('resets the timer when Reset button is clicked', () => {
    render(<Timer />);

    const startButton = screen.getByRole('button', { name: /start/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });

    // Start the timer
    fireEvent.click(startButton);

    // Advance the timer by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Confirm the timer has decreased from the initial value (e.g., check it's not "0:20")
    const timerLabel = screen.getByText(/0:\d{2}/);
    expect(timerLabel).not.toHaveTextContent('0:20');

    // Click reset button and check that timer resets to initial value (0:20)
    fireEvent.click(resetButton);
    expect(screen.getByText('0:20')).toBeInTheDocument();
    expect(startButton).not.toBeDisabled(); // Ensure Start is enabled again after reset
  });
});
