import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OptionsProvider } from '../context/OptionsContext';
import Music from '../pages/Music';

const playMock = jest.spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(async () => { });
const pauseMock = jest.spyOn(window.HTMLMediaElement.prototype, "pause")
  .mockImplementation(async () => { });

describe("Music page", () => {
  it("plays/pauses music when PlayPause is clicked", async () => {
    render(<Music />);

    const playPauseButton = screen.getAllByText("\u23F5")[0];
    expect(playPauseButton).toBeDefined();

    expect(playMock).not.toBeCalled();

    fireEvent.click(playPauseButton);
    await waitFor(() => expect(playMock).toBeCalled());
    await waitFor(() => expect(playPauseButton).toHaveTextContent("\u23F8"));
    expect(pauseMock).not.toBeCalled();

    fireEvent.click(playPauseButton);
    await waitFor(() => expect(pauseMock).toBeCalled());
    await waitFor(() => expect(playPauseButton).toHaveTextContent("\u23F5"));
  });

  it("selecting pages does deselect others", async () => {
    render(<OptionsProvider><Music /></OptionsProvider>);

    const selectButtons = screen.getAllByText(/select music/i);
    expect(selectButtons.length).toBeGreaterThanOrEqual(4);
    
    const expectSelection = async (selection: number) => {
      for (let i = 0; i < selectButtons.length; i++) {
        if (i === selection)
          await waitFor(() => expect(selectButtons[i]).toBeDisabled());
        else
          await waitFor(() => expect(selectButtons[i]).toBeEnabled());
      }
    }

    await expectSelection(0);

    fireEvent.click(selectButtons[1]);
    await expectSelection(1);

    fireEvent.click(selectButtons[3]);
    await expectSelection(3);
  });
});
