import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../REDUX/ducks/auth'
import ModalWindow from '../../User interface/modal'

import './style.scss'

class Login extends Component {


    /**
     *  @desc - method do request to primat-bot and take all subj/lection
     */
    componentWillMount() {
        console.log(this);
        fetch('https://primat-bot.herokuapp.com/api/abstracts?course=2&semester=2&flow=%D0%BA%D0%B2')
            .then(res => res.json())
            .then(d => {
                ::this.dataParse(d.data);
            })
            .catch((err) => console.error('some error :c'))
    }

    /**
     * @param data (request data)
     * @desc -  change state with subject
     */
    dataParse(data) {
        const { take_subject } = this.props.AuthActions;
        take_subject(data);
    }

    /**
     * @param event
     * @desc - do request and take telegraphURL
     */
    takeTelegraph(e) {
        const lection_id = e.target.id;
        const { take_url } = this.props.AuthActions;

        fetch(`https://primat-bot.herokuapp.com/api/abstracts/${lection_id}`)
            .then(res => res.json())
            .then(d => {
                let buffText = d.data.telegraph_url;
                take_url(buffText);
            })
            .catch((err) => console.error('some error :c'))
    }

    /**
     * @returns HTML with all subject
     */
    subjView() {
        const subj = this.props.auth.subj;
        if (!subj) {
            return 'load ...'
        } else {
            let buff = [];
            Object.keys(subj).map((item, index) => {
                buff.push(
                    <div key={index} id={item} onClick={::this.lectionView}>
                        {item}
                    </div>
                )
            })
            return buff;
        }
    }

    /**
     * @param event
     * @return HTML with lection
     *      @redux - change state with lection
     */
    lectionView(e) {
        const name = e.target.id;
        const data = this.props.auth.subj;
        const { take_lection } = this.props.AuthActions;

        let buff = [];
        Object.values(data).map((item) => {
           item.map((i, itter) => {
               if (i.subject == name) {
                   buff.push(
                       <div key={itter} id={i._id} onClick={::this.takeTelegraph}>
                           {i.name}
                       </div>
                   )
               }
           })

        })
        take_lection(buff);
    }

    /**
         * @desc - render component
         * @returns {HTML}
     */
    render() {
        return (
            <div>
                <h5>subj</h5>
                {::this.subjView()}
                <hr/>
                <h5>lections</h5>
                {this.props.auth.lections}
                <hr/>
                <h5>url telegraph</h5>
                {/*{::this.smallLectionsView()}*/}
                {this.props.auth.telegraphUrl}
            </div>
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