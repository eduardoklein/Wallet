import { screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

describe('Testa tela de Login', () => {
  renderWithRouterAndRedux(<App />, { initialState });
  it('Testa tela de Login', async () => {
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
    expect(loginButton).toBeDisabled();
    act(() => {
      userEvent.type(loginInputs, 'email@email.com');
      userEvent.type(passwordInput, '1234567');
      userEvent.click(loginButton);
    });
    expect(window.location.pathname).toBe('/carteira');
    const emailHeader = screen.getByTestId('email-field');
    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
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
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpense).toBeInTheDocument();
    act(() => {
      userEvent.type(valueInput, '45');
      userEvent.type(descriptionInput, 'Xablau');
      // userEvent.selectOptions(currencyInput, 'USD');
      userEvent.selectOptions(methodInput, 'Dinheiro');
      userEvent.selectOptions(tagInput, 'Trabalho');
      userEvent.click(addExpense);
    });
    userEvent.click(await screen.findByRole('button', { name: /editar/i }));
  });
});
