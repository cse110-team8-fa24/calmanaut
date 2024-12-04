import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthorizationContext } from "../context/AuthorizationContext";
import { ProfileId} from "../pages/ProfileId";
import * as Util from "../lib/Util";

jest.mock("../lib/Util");

const mockGet = Util.get as jest.Mock;


describe("ProfileId Component", () => {
  const mockContextValue = {
    isLoggedIn: true,
    setIsLoggedIn: jest.fn(),
    username: "testUser",
    setUsername: jest.fn(),
    id: 1,
    setId: jest.fn(),
  };

  const todaysDate: string = new Date().toISOString().split('T')[0];

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <AuthorizationContext.Provider value={mockContextValue}>
          <ProfileId />
        </AuthorizationContext.Provider>
      </BrowserRouter>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders user information correctly", async () => {
    mockGet
  .mockResolvedValueOnce({
    user: {
      username: "testUser",
      createDate: "2023-02-01",
      id: 1,
      meditationDates: [],
    },
  }) // First call to `Util.get`
  .mockResolvedValueOnce({
    user: {
      username: "testUser",
      createDate: "2023-02-01",
      id: 1,
      meditationDates: [], 
    },
  });
    
    renderComponent();

    expect(await screen.findByText(/testUser/i)).toBeInTheDocument();
    expect(screen.getByText(/Signed up on 2023-02-01/)).toBeInTheDocument();
  });

  test("displays correct streak values for no meditation dates", async () => {
    mockGet
  .mockResolvedValueOnce({
    user: {
      username: "testUser",
      createDate: "2023-02-02",
      id: 1,
      meditationDates: [],
    },
  }) // First call to `Util.get`
  .mockResolvedValueOnce({
    user: {
      username: "testUser",
      createDate: "2023-02-02",
      id: 1,
      meditationDates: [], 
    },
  });

    renderComponent();

    expect(await screen.findByText(/Meditation Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Streak: 0 days/)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 0 days/)).toBeInTheDocument();
  });

  test("displays correct streak values for consecutive dates", async () => {
    const dates = ["2023-12-01", "2023-12-02", "2023-12-03"];
    mockGet
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates,
      },
    }) // First call to `Util.get
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates, 
      },
    });
    
  
    renderComponent();   
    
    expect(await screen.findByText(/Meditation Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Streak: 0 days/)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 3 days/)).toBeInTheDocument();
  });
  
  test("displays correct streak values for non-consecutive dates", async () => {
    const dates = ["2023-12-01", "2023-12-03", "2023-12-05"];
    mockGet
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates,
      },
    }) // First call to `Util.get`"2023-12-01", "2023-12-03", "2023-12-04"
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates, 
      },
    });

    renderComponent();

    expect(await screen.findByText(/Meditation Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Streak: 0 days/)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 1 days/)).toBeInTheDocument();
  });

  test("displays correct streak values for past consecutive dates with current day as option", async () => {
    const dates = ["2023-12-01", "2023-12-03", "2023-12-04", todaysDate];
    mockGet
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates,
      },
    }) // First call to `Util.get`
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates, 
      },
    });

    renderComponent();

    expect(await screen.findByText(/Meditation Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Streak: 1 days/)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak: 2 days/)).toBeInTheDocument();
  });

  test("displays emojis based on current streak", async () => {
    const dates = ["2023-12-01", "2023-12-03", "2023-12-04", todaysDate];
    mockGet
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates,
      },
    }) // First call to `Util.get`
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates, 
      },
    });

    renderComponent();

    expect(await screen.findByText(/🔥/)).toBeInTheDocument(); // Ensure fire emojis is displayed
    expect(screen.queryByText(/😢/)).not.toBeInTheDocument(); // Ensure cry emoji is not displayed
  });

  test("displays cry emoji when current streak is 0", async () => {
    const dates = ["2023-12-01", "2023-12-02", "2023-12-03"];
    mockGet
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates,
      },
    }) // First call to `Util.get
    .mockResolvedValueOnce({
      user: {
        username: "testUser",
        createDate: "2023-02-02",
        id: 1,
        meditationDates: dates, 
      },
    });

    renderComponent();

    expect(await screen.findByText(/😢/)).toBeInTheDocument(); // Ensure cry emoji is displayed
    expect(screen.queryByText(/🔥/)).not.toBeInTheDocument(); // Ensure fire emoji is not displayed
  });
});
