import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../REDUX/ducks/auth'
import ModalWindow from '../../User interface/modal'

import './style.scss'

class Login extends Component {

    /**
         * @desc - render component
         * @returns {HTML}
     */
    render() {
        return (
            <h1>lel</h1>
        )
    }
}





    /**
        * @default - default give access to redux
        * @param state
        * @returns {{auth: {common, with auth, reducer} }}
    */
    function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

    /**
        * @default - default give access to common action
        * @param dispatch
        * @returns {{AuthActions: (ActionCreator<any> | ActionCreatorsMapObject)}}
     */
    function mapDispatchToProps(dispatch) {
    return {
        AuthActions: bindActionCreators(AuthActions, dispatch)
    }
}

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));