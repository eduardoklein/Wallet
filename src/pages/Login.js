import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../redux/store';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      email: '',
      senha: '',
    };
  }

  handleOnChange = ({ target }) => {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({ [id]: value }), () => {
      this.btnEnable();
    });
  };

  handleOnClick = (event) => {
    const { history } = this.props;
    const emailInput = document.getElementById('email');
    store.dispatch(addEmail(emailInput.value));
    emailInput.value = '';
    event.preventDefault();
    history.push('/carteira');
  };

  btnEnable = () => {
    const { email, senha } = this.state;
    const lenghtToEnable = 6;
    if (senha.length >= lenghtToEnable && /\S+@\S+\.\S+/.test(email)) {
      // https://bobbyhadz.com/blog/react-check-if-email-is-valid#:~:text=To%20validate%20an%20email%20in,is%20valid%20and%20false%20otherwise.
      this.setState(() => ({
        buttonDisabled: false,
      }));
    } else {
      this.setState(() => ({
        buttonDisabled: true,
      }));
    }
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">E-mail: </label>
          <input
            data-testid="email-input"
            onChange={ this.handleOnChange }
            id="email"
            type="email"
          />
          <label htmlFor="senha"> Senha: </label>
          <input
            data-testid="password-input"
            onChange={ this.handleOnChange }
            id="senha"
            type="password"
          />
          <button
            onClick={ this.handleOnClick }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// https://snyk.io/advisor/npm-package/prop-types/functions/prop-types.shape

const mapStateToProps = (state) => ({
  email: state.email,
});

export default connect(mapStateToProps)(Login);
