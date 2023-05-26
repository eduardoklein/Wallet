import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { globalEmail, totalExpenses } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{ globalEmail }</h2>
        <h2 data-testid="total-field">{ totalExpenses }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

Header.propTypes = {
  globalEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  globalEmail: user.email,
  totalExpenses: wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
