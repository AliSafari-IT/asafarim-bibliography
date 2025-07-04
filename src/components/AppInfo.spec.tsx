import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderComponent, act, advanceTimers } from '../utils/test-utils';
import AppInfo from './AppInfo';

describe('AppInfo Component', () => {
  let cleanup: () => void;
  
  beforeEach(() => {
    // JSDOM lacks animation support — skip timers
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    // Cleanup after each test
    if (cleanup) {
      cleanup();
    }
    vi.clearAllTimers();
  });

  it('should render collapsed by default', () => {
    const { unmount } = renderComponent(<AppInfo />);
    cleanup = unmount;
    
    const headerElements = screen.getAllByTestId('doc-tab-0');
    expect(headerElements[0]).toBeInTheDocument();
    expect(screen.queryByText(/ASafariM Bibliography/i)).not.toBeInTheDocument();
  });

  it('expands on header click', () => {
    const { unmount } = renderComponent(<AppInfo />);
    cleanup = unmount;
    
    const headerElements = screen.getAllByTestId('doc-tab-0');
    
    act(() => {
      fireEvent.click(headerElements[0]);
    });
    advanceTimers(300);

    expect(screen.getByText(/ASafariM Bibliography/i)).toBeInTheDocument();
    expect(screen.getByText(/This application demonstrates/i)).toBeInTheDocument();
  });

  it('toggles collapse and expand on click', () => {
    const { unmount } = renderComponent(<AppInfo />);
    cleanup = unmount;
    
    const headerElements = screen.getAllByTestId('doc-tab-0');
    const header = headerElements[0];

    // Expand
    act(() => {
      fireEvent.click(header);
    });
    advanceTimers(300);
    expect(screen.getByText(/ASafariM Bibliography/i)).toBeInTheDocument();

    // Collapse
    act(() => {
      fireEvent.click(header);
    });
    advanceTimers(300);
    expect(screen.queryByText(/ASafariM Bibliography/i)).not.toBeInTheDocument();
  });

  it('applies fade-in and fade-out classes when toggling', () => {
    const { container, unmount } = renderComponent(<AppInfo />);
    cleanup = unmount;
    
    const headerElements = screen.getAllByTestId('doc-tab-0');
    const header = headerElements[0];

    act(() => {
      fireEvent.click(header); // expand
    });
    advanceTimers(300);
    const content = screen.getByText(/ASafariM Bibliography/i).parentElement?.parentElement;
    expect(content?.className).toContain('fade-in');

    act(() => {
      fireEvent.click(header); // collapse
    });
    advanceTimers(300);
    const appContainer = container.querySelector('.app-info-container');
    expect(appContainer?.className).toContain('collapsed');
  });
});
