import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { expensesArray } = this.props;
    console.log(expensesArray);
    return (
      <div>
        <Header />
        <WalletForm />
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expensesArray.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>
                  {Number((element.exchangeRates[element.currency].ask))
                    .toFixed(2)}
                </td>
                <td>
                  {(element.value * element.exchangeRates[element.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <button>Editar</button>
                <button>Excluir</button>
                {/* Voce tem esses valores dentro do expenses em exchangeRates
  */}
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  expensesArray: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expensesArray: wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
