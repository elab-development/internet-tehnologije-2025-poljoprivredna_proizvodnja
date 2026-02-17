

// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
 
// Mockujemo API i Auth da ne pokušava pravi HTTP poziv
jest.mock('./services/api', () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({}))
  },
  setAuthToken: jest.fn()
}));
 
jest.mock('./services/auth', () => ({
  getRole: jest.fn(() => 1),  // vraća Admin
  getUserFromToken: jest.fn(() => ({ name: 'Test User' })),
  saveAuth: jest.fn()
}));
 
describe('AgroPanel App', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Proveri da li se pojavljuje neki tekst sa dashboarda
    expect(screen.getByText(/Početna strana/i)).toBeInTheDocument();
  });

});
