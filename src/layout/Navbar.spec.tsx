import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { renderComponent, act } from '../utils/test-utils';

// Mock matchMedia for Headless UI
beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('Navbar component', () => {
  let cleanup: () => void;
  
  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });
  
  it('renders navbar with navigation links', () => {
    const { unmount } = renderComponent(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    cleanup = unmount;

    expect(screen.getByText('ASafariM Bibliography')).toBeInTheDocument();
    expect(screen.getByText('Bibliography')).toBeInTheDocument();
    
    // Use a more specific selector to find the "Add Book" link in the navigation
    const addBookLinks = screen.getAllByText('Add Book');
    expect(addBookLinks.length).toBeGreaterThan(0);
    
    // Verify at least one "Add Book" link exists
    expect(addBookLinks[0]).toBeInTheDocument();
  });

  it('activates "Bibliography" link by default', () => {
    const { container, unmount } = renderComponent(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    cleanup = unmount;

    // Use querySelector to find the first Bibliography link in the desktop menu
    const bibLink = container.querySelector('.hidden.sm\\:ml-6.sm\\:block a[href="/"]');
    expect(bibLink).toHaveClass('bg-gray-900');
  });

  it('activates clicked navigation item', () => {
    const { unmount } = renderComponent(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    cleanup = unmount;

    // Find the "Add Book" link in the navigation (not the button)
    const addBookLinks = screen.getAllByText('Add Book');
    
    // Get the link that's part of the navigation (not the button with the plus icon)
    const addBookLink = addBookLinks.find(link => 
      link.closest('a')?.getAttribute('href') === '/add' && 
      !link.closest('a')?.querySelector('svg')
    );
    
    expect(addBookLink).toBeDefined();
    
    if (addBookLink) {
      // Click the link
      act(() => {
        fireEvent.click(addBookLink);
      });
      
      // After clicking, the link should have the active class
      expect(addBookLink.closest('a')).toHaveClass('bg-gray-900');
    }
  });

  it('toggles mobile menu when Disclosure button is clicked', () => {
    const { container, unmount } = renderComponent(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    cleanup = unmount;

    // Use querySelector to find the first mobile menu button
    const menuButton = container.querySelector('.absolute.inset-y-0.left-0 button');
    expect(menuButton).toBeInTheDocument();

    if (menuButton) {
      act(() => {
        fireEvent.click(menuButton);
      });
      
      // After clicking, the mobile menu should be visible
      const mobileMenu = container.querySelector('.sm\\:hidden');
      expect(mobileMenu).toBeVisible();
    }
  });

  it('renders Add button with Plus icon', () => {
    const { container, unmount } = renderComponent(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    cleanup = unmount;

    // Find the Add button (the one with the plus icon)
    const addButton = container.querySelector('.absolute.inset-y-0.right-0 a');
    expect(addButton).toBeInTheDocument();
    
    // Verify it has the plus icon
    const plusIcon = addButton?.querySelector('svg');
    expect(plusIcon).toBeInTheDocument();
  });
});
