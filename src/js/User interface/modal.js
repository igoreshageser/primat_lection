import React, {Component} from 'react'
import * as AuthActions from '../REDUX/ducks/lectionTree'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import 'scss/user interface styles/modalWindow.scss';


 class ModalWindow extends Component {
     /**
      * @desc - omg :c
      */
    componentDidUpdate() {
        let view = this.props.auth.view

        if (!view) {
            this.refs.modal.classList.remove('commonStyle--modal__open')
            this.refs.modal.classList.add('commonStyle--modal__close')
        }
        else {
            this.refs.modal.classList.remove('commonStyle--modal__close')
            this.refs.modal.classList.add('commonStyle--modal__open')
        }
    }

     /**
      * @desc - close modal window
      */
    closeModal() {
        let view = this.props.auth.view
        const { modal_view } = this.props.AuthActions
        this.refs.modal.classList.remove('commonStyle--modal__open')
        this.refs.modal.classList.add('commonStyle--modal__close')
         modal_view(false, this.props.auth.modalType)

         let checkRedirect = this.props.auth.modalType !== 'login' &&  this.props.auth.modalType !== 'error'
         if (checkRedirect) {
             this.props.redirectLogin.push('/login')
         }
    }

     /**
      * @desc - render function // type Identify text and src svg image in modal window
      * @returns {XML}
      */
    render() {
         let textMain = '';
         let textSmall =  '';
         let picture = '';

        switch (this.props.auth.modalType) {
            case 'error': {
                textMain = 'Такий користувач не зареєстрований';
                textSmall = 'Спробувати ще';
                picture = './../../assets/img/error.svg';
                break
            }
            case 'login': {
                console.log('login >>');
                textMain = "Невірний'\n' логін або пароль";
                textSmall = 'Спробувати ще раз';
                picture = './../../assets/img/error.svg';
                break
            }
            case 'registration': {
                textMain = 'Реєстрація успішно завершена';
                textSmall = 'Почати роботу';
                picture = './../../assets/img/success.svg';
                break
            }
            case 'connection_error': {
                textMain = "Немає з\'єднання";
                textSmall = 'Спробувати пiзнiше';
                picture = './../../assets/img/wireless-error.svg';
                break
            }

        }


         // if (this.props.auth.modalType === 'error') {
         //     textMain = 'Такий користувач не зареєстрований';
         //     textSmall = 'Спробувати ще';
         //     picture = './../../assets/img/error.svg'
         // } else if (this.props.auth.modalType === 'login') {
         //     console.log('login >>');
         //     textMain = 'Невірний\n логін або пароль';
         //     textSmall = 'Спробувати ще раз';
         //     picture = './../../assets/img/error.svg'
         // } else if (this.props.auth.modalType === 'registration') {
         //     textMain = 'Реєстрація успішно завершена';
         //     textSmall = 'Почати роботу';
         //     picture = './../../assets/img/success.svg'
         // } else if (this.props.auth.modalType === 'connection_error') {
         //     textMain = 'mama, tut connection umer :c';
         //     picture = './../../assets/img/error.svg'
         // }


        return (
            <center>
                <div className="commonStyle--modal__close" ref="modal">
                    <div className="commonStyle--modal__header">
                        <img onClick={::this.closeModal} src="./../../assets/img/ico_close.svg" alt="X" width="15"
                             height="15"/>
                    </div>
                    <div className="commonStyle--modal__body">
                        <img src={picture} alt="error" width="44" height="44"/>
                        <p>{textMain}</p>
                    </div>
                    <div className="commonStyle--modal__footer">
                        <p onClick={::this.closeModal}> {textSmall} </p>
                    </div>
                </div>
            </center>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);