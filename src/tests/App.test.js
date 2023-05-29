import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa tela de Login', () => {
  renderWithRouterAndRedux(<App />);
  it('Testa tela de Login', () => {
    const loginInputs = screen.getByRole('textbox', {
      name: /e-mail:/i,
    });
    expect(loginInputs).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(loginButton).toBeInTheDocument();
    userEvent.type(loginInputs, 'email@email.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);
    expect(window.location.pathname).toBe('/carteira');
  });
  it('Testa tela da Carteira', () => {
    renderWithRouterAndRedux(<App />);
    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toBeInTheDocument();
    const brl = screen.getByRole('heading', {
      name: /brl/i,
    });
    expect(brl).toBeInTheDocument();
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
    const addExpense = screen.getByRole('button', /entrar/i);
    expect(addExpense).toBeInTheDocument();
    userEvent.type(valueInput, '45');
    userEvent.type(descriptionInput, 'Compras');
    userEvent.click(addExpense);
  });
});
