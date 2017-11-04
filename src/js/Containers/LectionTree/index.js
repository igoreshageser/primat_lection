import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../REDUX/ducks/lectionTree'
import ModalWindow from '../../User interface/modal'
import buidTree from './tree'
import './style.scss'

class LectionTree extends Component {

    /**
     *  @desc - method do request to primat-bot and take all subj/lection
     */
    componentWillMount() {
        fetch('https://primat-bot.herokuapp.com/api/abstracts?course=3&semester=1&flow=%D0%BA%D0%B2')
            .then(res => res.json())
            .then(d => {
                ::this.dataParse(d.data);
            })
    }

    /**
     * @param data (request data)
     * @desc -  change state with subject
     */
    dataParse(data) {
        const { take_req_data, tree_view } = this.props.AuthActions;
        const kek = data;

        take_req_data(data);
        // ::this.subjView();

        let buff = [];

        let keys = Object.keys(data);
        Object.values(kek).map((item, index) => {
            let subject = {
                "name": keys[index],
                "children": []
            };

            item.map((lec) => {
                let lection = {
                    "name": lec.name
                };
                subject.children.push(lection);
            });

            buff.push(subject);
        });

        let test = {
            "name": "2 РєСѓСЂСЃ",
            "parent": "null",
            "children": buff
        };


        tree_view(test);
        ::this.buildTree();
    }


    buildTree() {
        let treeData = this.props.auth.treeView;
        buidTree(treeData, this);
    }



    /**
     * @desc - render component
     * @returns {HTML}
     */
    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="subject">
                        {/*<h5>subj</h5>*/}
                        {/*{this.props.auth.subj}*/}
                        {/*<hr/>*/}
                    </div>
                    <div className="lections">
                        {/*<h5>lections</h5>*/}
                        {/*{this.props.auth.lections}*/}
                        {/*<hr/>*/}
                    </div>
                    <div className="TelegraphUrl">
                        {/*<h5>url telegraph: {this.props.auth.telegraphUrl}</h5>*/}
                        {/*<a target="_blank" href={this.props.auth.telegraphUrl}>Read Lection</a>*/}
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LectionTree));