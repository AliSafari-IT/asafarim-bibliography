import { screen, fireEvent } from '@testing-library/react';
import DatabaseErrorMessage from './DatabaseErrorMessage';
import { vi } from 'vitest';
import { renderComponent, act } from '../utils/test-utils';

describe('<DatabaseErrorMessage />', () => {
  let cleanup: () => void;
  
  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });
  
  it('renders generic database error message', () => {
    const { unmount } = renderComponent(<DatabaseErrorMessage error="Something went wrong" />);
    cleanup = unmount;
    
    expect(screen.getByText(/database error/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders missing table error message with extra hints', () => {
    const { unmount } = renderComponent(<DatabaseErrorMessage error="Table 'Books' doesn't exist" />);
    cleanup = unmount;
    
    expect(screen.getByText(/database tables not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/the required database tables for the bibliography feature/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/table 'books' doesn't exist/i)).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    const { unmount } = renderComponent(
      <DatabaseErrorMessage error="Some DB error" onRetry={onRetry} />
    );
    cleanup = unmount;
    
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    });
    expect(onRetry).toHaveBeenCalled();
  });

  it('does not show button if onRetry is not passed', () => {
    const { unmount } = renderComponent(<DatabaseErrorMessage error="DB is down" />);
    cleanup = unmount;
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
