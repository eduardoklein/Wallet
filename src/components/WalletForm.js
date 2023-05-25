import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const dataCodes = Object.keys(data).map((currency) => currency);
    store.dispatch(fetchCurrencies(dataCodes));
  }

  render() {
    const { currenciesObj } = this.props;
    console.log(currenciesObj);
    return (
      <div>
        <p data-testid="value-input">Value</p>
        <p data-testid="description-input">Description</p>
        <form>
          <label htmlFor="currencies">Currencies: </label>
          <select data-testid="currency-input" id="currencies" name="currencies">
            { currenciesObj.map((c) => <option key={ c }>{c}</option>) }
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currenciesObj: PropTypes.shape.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currenciesObj: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
