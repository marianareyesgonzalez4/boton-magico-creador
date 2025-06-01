import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeToggle } from './theme-toggle'; // Adjust path as needed
import { ThemeContext, ThemeProvider } from '@/context/ThemeContext'; // Adjust path
import React, { useState } from 'react';

// Helper component to provide a controllable mock ThemeProvider
const MockThemeProvider: React.FC<{ children: React.ReactNode; initialTheme?: 'light' | 'dark' }> = ({ children, initialTheme = 'light' }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(initialTheme);
  
  const mockSetTheme = vi.fn((newTheme) => {
    setThemeState(newTheme);
  });

  const mockToggleTheme = vi.fn(() => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  });

  // Expose a way to change the theme for testing purposes, if needed beyond toggle
  // For this component, toggleTheme is sufficient.
  // We are testing ThemeToggle, not ThemeProvider itself.
  // The key is that ThemeToggle calls the toggleTheme from the context.

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: mockToggleTheme, setTheme: mockSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


describe('ThemeToggle', () => {
  it('should render Moon icon when theme is light', () => {
    render(
      <MockThemeProvider initialTheme="light">
        <ThemeToggle />
      </MockThemeProvider>
    );
    // Check for Moon icon (Lucide components don't have direct text, check by class or structure if needed)
    // For simplicity, we can check the aria-label which changes based on the theme.
    // The Moon icon is inside the button. Let's find the button first.
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Cambiar a modo oscuro');
    // Check if Moon icon's specific class or structure exists
    // Lucide icons are usually <svg> elements. We can check for a class associated with Moon.
    // The icons themselves don't have specific test IDs.
    // Let's assume Moon/Sun components add a specific class or title if needed for robust query.
    // For now, aria-label and visual inspection of the component code (Moon when light, Sun when dark) is the primary check.
    // If Moon and Sun components render distinct SVG paths, those could be checked.
    // Given the component code: `{theme === 'light' ? <Moon /> : <Sun />}`
    // We can verify the presence of one and absence of other if we can query them.
    // A simple way is to check for a class that might be unique to Moon/Sun if they have one.
    // Or rely on the aria-label and the logic that it shows Moon for light.
  });

  it('should render Sun icon when theme is dark', () => {
    render(
      <MockThemeProvider initialTheme="dark">
        <ThemeToggle />
      </MockThemeProvider>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Cambiar a modo claro');
    // Similar to above, verifying Sun icon presence.
  });

  it('should call toggleTheme when clicked (light to dark)', () => {
    // We need access to the mockToggleTheme function provided by this specific render instance.
    // So, it's better to define the mock function outside and pass it to a more flexible TestWrapper.

    const mockToggleTheme = vi.fn();
    const mockSetTheme = vi.fn(); // Not directly used by ThemeToggle's click, but part of context

    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: mockToggleTheme, setTheme: mockSetTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
  
  it('should call toggleTheme when clicked (dark to light)', () => {
    const mockToggleTheme = vi.fn();
    const mockSetTheme = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: mockToggleTheme, setTheme: mockSetTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should change icon and aria-label after theme is toggled', () => {
    // This test requires the theme value in the context to actually change.
    // The MockThemeProvider helper handles this.
    render(
      <MockThemeProvider initialTheme="light">
        <ThemeToggle />
      </MockThemeProvider>
    );

    const button = screen.getByRole('button');
    
    // Initial state: light theme, Moon icon, aria-label "Cambiar a modo oscuro"
    expect(button).toHaveAttribute('aria-label', 'Cambiar a modo oscuro');
    // You would ideally also check for Moon icon presence here

    fireEvent.click(button);

    // After click: theme should be dark, Sun icon, aria-label "Cambiar a modo claro"
    expect(button).toHaveAttribute('aria-label', 'Cambiar a modo claro');
    // You would ideally also check for Sun icon presence here
    
    fireEvent.click(button);

    // After second click: theme should be light, Moon icon, aria-label "Cambiar a modo oscuro"
    expect(button).toHaveAttribute('aria-label', 'Cambiar a modo oscuro');
    // You would ideally also check for Moon icon presence here
  });
});
