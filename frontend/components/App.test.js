import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from '../components/AppFunctional';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


test('Başlıkların görüntülendiğini kontrol et', () => {
  render(<AppFunctional />);
  expect(screen.getByText('Koordinatlar (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('0 kere ilerlediniz')).toBeInTheDocument();
  expect(screen.getByText('')).toBeInTheDocument(); // Mesaj başlangıçta boş olmalı
});

test('Butonların görüntülendiğini kontrol et', () => {
  render(<AppFunctional />);
  expect(screen.getByText('SOL')).toBeInTheDocument();
  expect(screen.getByText('YUKARI')).toBeInTheDocument();
  expect(screen.getByText('SAĞ')).toBeInTheDocument();
  expect(screen.getByText('AŞAĞI')).toBeInTheDocument();
  expect(screen.getByText('reset')).toBeInTheDocument();
});

test('Inputa yazılan metnin value değişimini kontrol et', () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText('email girin');
  fireEvent.change(input, { target: { value: 'example@example.com' } });
  expect(input.value).toBe('example@example.com');
});

test('Formun submit edildiğinde mesajın görüntülendiğini kontrol et', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText('email girin');
  const submitButton = screen.getByText('submit');
  fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
  fireEvent.click(submitButton);
  expect(screen.getByText('Mesaj başarıyla gönderildi.')).toBeInTheDocument();
});

test('Reset butonuna tıklandığında formun sıfırlandığını kontrol et', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText('email girin');
  const resetButton = screen.getByText('reset');
  fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
  fireEvent.click(resetButton);
  expect(emailInput.value).toBe('');
});
