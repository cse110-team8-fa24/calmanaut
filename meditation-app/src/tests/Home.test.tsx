import { render, screen, fireEvent, act } from '@testing-library/react';
import Timer from '../pages/Home'; 

jest.useFakeTimers();
jest.spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(async () => {});
jest.spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(async () => {});

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

    // Confirm the timer has decreased from the initial value (check it's not 0:20)
    const timerLabel = screen.getByText(/0:\d{2}/);
    expect(timerLabel).not.toHaveTextContent('1:00');

    // Click reset button and check that timer resets to initial value (0:20)
    fireEvent.click(resetButton);
    expect(screen.getByText('1:00')).toBeInTheDocument();
    expect(startButton).not.toBeDisabled(); // Ensure Start is enabled again after reset
  });

  it('disables the Start button when the timer starts', () => {
    render(<Timer />);
    const startButton = screen.getByRole('button', { name: /start/i });
  
    fireEvent.click(startButton);
    expect(startButton).toBeDisabled();
  });
  
  it('disables Start button when timer is set to zero', () => {
    render(<Timer />);
    const startButton = screen.getByRole('button', { name: /start/i });
    const timeInput = screen.getByRole('spinbutton') as HTMLInputElement;
  
    fireEvent.change(timeInput, { target: { value: '0' } });
    expect(startButton).toBeDisabled();
  });

  it('updates the displayed time when the timer limit is changed', () => {
    render(<Timer />);
    const timeInput = screen.getByRole('spinbutton') as HTMLInputElement;
  
    fireEvent.change(timeInput, { target: { value: '30' } });
    expect(screen.getByText('0:30')).toBeInTheDocument(); 
  });
  
  it('enforces a minimum limit of 15 seconds', () => {
    render(<Timer />);
    const timeInput = screen.getByRole('spinbutton') as HTMLInputElement;
  
    fireEvent.change(timeInput, { target: { value: '10' } });
    expect(timeInput.value).toBe('15'); // Input should adjust to 15
    expect(screen.getByText('0:15')).toBeInTheDocument(); // Timer should display 0:15
  });

  it('enforces a maximum limit of 3600 seconds', () => {
    render(<Timer />);
    const timeInput = screen.getByRole('spinbutton') as HTMLInputElement;
  
    fireEvent.change(timeInput, { target: { value: '3700' } });
    expect(timeInput.value).toBe('3600'); // Input should adjust to 600
    expect(screen.getByText('60:00')).toBeInTheDocument(); // Timer should display 10:00
  });
  
});
