import React, {Component} from 'react';
import * as AuthActions from '../../REDUX/ducks/lectionTree';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import './style.scss'

const Spinner = ( props ) => {
    const { loaderView } = props;

    return (
        <div className={loaderView ? 'spinnerWrapper' : 'hide'}>
            <div className={loaderView ? 'spinner' : 'hide'} />
        </div>
    )
};

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


export default connect(mapStateToProps, mapDispatchToProps)(Spinner);