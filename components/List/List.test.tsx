/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './List'; // Adjust the import path as necessary

// Mock data for testing
const mockTasks = [
  { id: '1', task: 'Task 1', isComplete: false },
  { id: '2', task: 'Task 2', isComplete: true },
];

const mockOnComplete = jest.fn();
const mockOnDelete = jest.fn();

describe('List Component', () => {
  beforeEach(() => {
    render(<List tasks={mockTasks} onComplete={mockOnComplete} onDelete={mockOnDelete} />);
  });

  test('renders tasks correctly', () => {
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('calls onComplete when check icon is clicked', () => {
    fireEvent.click(screen.getAllByTestId('check-icon')[0]);
    expect(mockOnComplete).toHaveBeenCalledWith('1');
  });

  test('calls onDelete when trash icon is clicked', () => {
    fireEvent.click(screen.getAllByTestId('trash-icon')[0]);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('applies line-through style to completed tasks', () => {
    const task2Element = screen.getByText('Task 2');
    expect(task2Element).toHaveClass('line-through');
  });
});
