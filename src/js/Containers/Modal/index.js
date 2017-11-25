import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../REDUX/ducks/lectionTree'

import { Dialog, FlatButton } from 'material-ui';


class Modal extends Component {

    handleOpen() {
        const { modal_view } = this.props.AuthActions;

        modal_view(true);
    };

    handleClose() {
        const { modal_view } = this.props.AuthActions;

        modal_view(false);
    };

   render() {
       const actions = [
           <FlatButton
               label="Закрыть"
               primary={true}
               onClick={::this.handleClose}
           />
       ];
       const { modalView } = this.props.auth;

        return(
            <Dialog
               title="Приветик :з"
               actions={actions}
               modal={false}
               open={modalView}
               onRequestClose={::this.handleClose}
            >
           <p>
               Оо, вы первый раз у нас!
                <br/>
                #TODO: чет ещё написать
           </p>
           <p>
                Да, адаптивность и нормальный дизайн еще не завезли
           </p>
           </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

