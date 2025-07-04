import { ReactElement } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../store/slices/bookSlice';
import { vi } from 'vitest';

/**
 * Test renderer for React 18 using createRoot
 */
export class TestRenderer {
  private container: HTMLDivElement;
  private root: Root;

  constructor() {
    // Create a container for the React component
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.root = createRoot(this.container);
  }

  /**
   * Render a React component using createRoot
   * @param element The React element to render
   */
  render(element: ReactElement) {
    act(() => {
      this.root.render(element);
    });
    return this.container;
  }

  /**
   * Unmount the component and clean up
   */
  unmount() {
    act(() => {
      this.root.unmount();
    });
    document.body.removeChild(this.container);
  }

  /**
   * Get the container element
   */
  getContainer() {
    return this.container;
  }
}

/**
 * Create a test store with the book reducer
 * @param preloadedState Initial state for the store
 */
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      books: bookReducer
    },
    preloadedState
  });
}

/**
 * Render a component with Redux Provider
 * @param ui Component to render
 * @param options Options including store
 */
export function renderWithRedux(ui: ReactElement, { store = createTestStore() } = {}) {
  const renderer = new TestRenderer();
  const container = renderer.render(
    <Provider store={store}>
      {ui}
    </Provider>
  );

  return {
    container,
    store,
    unmount: () => renderer.unmount()
  };
}

/**
 * Render a component without Redux
 * @param ui Component to render
 */
export function renderComponent(ui: ReactElement) {
  const renderer = new TestRenderer();
  const container = renderer.render(ui);

  return {
    container,
    unmount: () => renderer.unmount()
  };
}

/**
 * Helper to advance timers in tests
 * @param ms Milliseconds to advance
 */
export function advanceTimers(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

// Re-export testing utilities
export * from '@testing-library/react';
export { act } from 'react';
