import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import store from '../redux/store';
import { deleteExpense, showEditForm, idToEdit } from '../redux/actions';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  handleOnClick = (id, value) => {
    store.dispatch(deleteExpense(id, value));
  };

  handleOnClickEdit = (event, id) => {
    event.preventDefault();
    store.dispatch(showEditForm(true));
    store.dispatch(idToEdit(id));
  };

  render() {
    const { expensesArray, showEditF } = this.props;
    return (
      <div>
        <Header />
        {showEditF ? <EditForm /> : <WalletForm />}
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
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => this.handleOnClickEdit(event, element.id) }
                  >
                    Editar

                  </button>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.handleOnClick(
                      element.id,
                      (element.value * element.exchangeRates[element.currency].ask)
                        .toFixed(2),
                    ) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  expensesArray: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  showEditF: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expensesArray: wallet.expenses,
  showEditF: wallet.showEditForm,
});

export default connect(mapStateToProps)(Wallet);
