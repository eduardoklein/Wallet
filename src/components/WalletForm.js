import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import {
  fetchCurrencies,
  fetchExchangeRate,
  showEditForm,
  handleEdit,
  attTotal } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      idCounter: 0,
    };
  }

  async componentDidMount() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const dataCodes = Object.keys(data).map((currency) => currency);
    store.dispatch(fetchCurrencies(dataCodes));
  }

  handleOnChange = ({ target }) => {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (Number(value)) {
      this.setState(() => ({ [id]: Number(value) }));
    } else {
      this.setState(() => ({ [id]: value }));
    }
  };

  handleOnClick = async (event) => {
    event.preventDefault();
    const { value, description, idCounter } = this.state;
    const selectedCurrency = document.getElementById('currencies').value;
    const method = document.getElementById('payment').value;
    const tag = document.getElementById('expenseType').value;
    const expense = {
      id: idCounter,
      value,
      description,
      currency: selectedCurrency,
      method,
      tag,
    };
    await store.dispatch(fetchExchangeRate(expense));
    this.setState(() => ({
      value: '',
      description: '',
      idCounter: idCounter + 1,
    }));
    store.dispatch(attTotal());
  };

  handleEditClick = (event) => {
    event.preventDefault();
    const { id } = this.props;
    const { value, description } = this.state;
    const selectedCurrency = document.getElementById('currencies').value;
    const method = document.getElementById('payment').value;
    const tag = document.getElementById('expenseType').value;
    const expense = {
      id,
      value,
      description,
      currency: selectedCurrency,
      method,
      tag,
    };
    store.dispatch(handleEdit(expense));
    store.dispatch(showEditForm(false));
    store.dispatch(attTotal());
  };

  render() {
    const { currenciesObj, typeButton } = this.props;
    const { value, description } = this.state;
    console.log(currenciesObj);
    return (
      <div>
        <form>
          <label htmlFor="value">Valor: </label>
          <input
            data-testid="value-input"
            onChange={ this.handleOnChange }
            id="value"
            type="number"
            value={ value }
          />
          <label
            htmlFor="description"
          >
            Descricão:
            {' '}

          </label>
          <input
            data-testid="description-input"
            onChange={ this.handleOnChange }
            id="description"
            type="text"
            value={ description }
          />
          <label
            htmlFor="currencies"
          >
            Currencies:
            {' '}

          </label>
          <select
            data-testid="currency-input"
            id="currencies"
            name="currencies"
          >
            { currenciesObj.map((c) => <option key={ c } value={ c }>{c}</option>) }
          </select>
          <select data-testid="method-input" id="payment">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input" id="expenseType">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          {typeButton === 'editar'
            ? <button onClick={ this.handleEditClick }>Editar despesa</button>
            : <button onClick={ this.handleOnClick }>Adicionar despesa</button>}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currenciesObj: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  typeButton: PropTypes.string.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currenciesObj: wallet.currencies,
  expenses: wallet.expenses,
  id: wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
