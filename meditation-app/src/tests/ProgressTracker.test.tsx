import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthorizationContext } from "../context/AuthorizationContext";
import ProgressTracker from "../pages/ProgressTracker";



jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = require("react-router-dom").useNavigate;

describe("ProgressTracker", () => {
  const renderWithContext = (
    isLoggedIn: boolean, 
    localStorageData: string[] = []
) => {
    localStorage.setItem("meditationDates", JSON.stringify(localStorageData));
    render(
        <AuthorizationContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn: jest.fn(), 
            username: "testUser", 
            setUsername: jest.fn(), 
            id: 123, 
            setId: jest.fn(), 
          }}
        >
          <MemoryRouter>
            <ProgressTracker/>
          </MemoryRouter>
        </AuthorizationContext.Provider>
      );
  };

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });


  test("renders progress tracker when logged in", () => {
    renderWithContext(true);
    expect(screen.getByText(/Your Meditation Progress/i)).toBeInTheDocument();
  });

  test("displays streaks ", () => {
    const mockDates = ["2023-12-01", "2023-12-02", "2023-12-03"];
    renderWithContext(true, mockDates);

    expect(screen.getByText(/Current Streak: 3 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 3 days/i)).toBeInTheDocument();
    
  });

  test("calculates streaks correctly with non-consecutive dates", () => {
    const mockDates = ["2023-12-01", "2023-12-03", "2023-12-04", "2023-12-07"];
    renderWithContext(true, mockDates);

    expect(screen.getByText(/Current Streak: 1 day/i)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 2 days/i)).toBeInTheDocument();
  });

  test("displays no streaks if there are no meditation dates", () => {
    renderWithContext(true, []);

    expect(screen.getByText(/Current Streak: 0 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 0 days/i)).toBeInTheDocument();
  });

  test("handles empty localStorage gracefully", () => {
    renderWithContext(true);
    expect(screen.getByText(/Current Streak: 0 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 0 days/i)).toBeInTheDocument();
  });
});