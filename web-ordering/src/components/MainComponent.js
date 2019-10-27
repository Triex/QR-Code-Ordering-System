import React, { Component } from 'react';

import Menu from './MenuComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories, fetchCart } from '../redux/ActionCreators';
import Cart from './CartComponent';
// import { actions } from 'react-redux-form';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        categories: state.categories,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMenu: () => dispatch(fetchMenu()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCart: () => dispatch(fetchCart())
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchMenu();
        this.props.fetchCategories();
        this.props.fetchCart();
    }

    render() {
        return (
            <div>
                <Switch location={this.props.location}>
                    <Route path='/cart' component={() => <Cart cart={this.props.cart} />} />
                    <Route path='/menu' component={() => <Menu menu={this.props.menu} />} />
                    {/* <Route path='/menu/' component={DishWithId} /> */}
                    <Redirect to="/menu" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));