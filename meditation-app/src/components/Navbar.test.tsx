import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthorizationContext } from '../context/AuthorizationContext';
import Navbar from './Navbar';

describe('Navbar Component Tests', () => {
  const renderNavbar = (
    isLoggedIn: boolean | undefined,
    username: string,
    id: number
  ) => {
    return render(
      <AuthorizationContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn: jest.fn(),
          username,
          setUsername: jest.fn(),
          id,
          setId: jest.fn(),
        }}
      >
        <Router>
          <Navbar />
        </Router>
      </AuthorizationContext.Provider>
    );
  };

  test('renders the navbar with title and default links', () => {
    renderNavbar(false, '', -1); // Not logged in

    // Title
    expect(screen.getByText(/Calmanaut/i)).toBeInTheDocument();

    // Default links
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Resources/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign Up/i })).toBeInTheDocument();

    // Ensure logged-in links are not rendered
    expect(screen.queryByRole('link', { name: /Profile/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Log Out/i })).not.toBeInTheDocument();
  });

  test('renders logged-in links when user is logged in with an ID', () => {
    renderNavbar(true, 'testuser', 123); // Logged in with username and id

    // Logged-in links
    expect(screen.getByRole('link', { name: /Profile/i })).toHaveAttribute('href', '/profile/123');
    expect(screen.getByRole('link', { name: /Log Out/i })).toBeInTheDocument();

    // Ensure "Sign Up" link is not visible
    expect(screen.queryByRole('link', { name: /Sign Up/i })).not.toBeInTheDocument();
  });


  test('toggles the menu on button click', () => {
    renderNavbar(false, '', -1);

    const toggleButton = screen.getByRole('button', { name: /Toggle navigation menu/i });
    const navLinks = screen.getByRole('list', { hidden: true });

    // Ensure menu is initially hidden
    expect(navLinks).not.toHaveClass('show');

    // Click toggle to open menu
    fireEvent.click(toggleButton);
    expect(navLinks).toHaveClass('show');

    // Click toggle to close menu
    fireEvent.click(toggleButton);
    expect(navLinks).not.toHaveClass('show');
  });

  test('closes the menu when a link is clicked', () => {
    renderNavbar(false, '', -1);

    const toggleButton = screen.getByRole('button', { name: /Toggle navigation menu/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const navLinks = screen.getByRole('list', { hidden: true });

    // Open menu
    fireEvent.click(toggleButton);
    expect(navLinks).toHaveClass('show');

    // Click a link and verify menu closes
    fireEvent.click(aboutLink);
    expect(navLinks).not.toHaveClass('show');
  });

 
});
