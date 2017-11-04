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
        // fetch('https://primat-bot.herokuapp.com/api/abstracts?course=2&semester=2&flow=%D0%BA%D0%B2')
        //     .then(res => res.json())
        //     .then(d => {
        //         ::this.dataParse(d.data);
        //     });

        fetch('http://192.168.1.103:8000/api/test', {
            method: 'POST'
        })
            .then((d) => d.json())
            .then((d) => console.log(d))
            .catch((err) => console.log(err))
    }

    /**
     * @param data (request data)
     * @desc -  change state with subject
     */
    dataParse(data) {
        const { take_req_data, tree_view } = this.props.AuthActions;
        const kek = data;

        take_req_data(data);
        ::this.subjView();

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
                "name": "2 курс",
                "parent": "null",
                "children": buff
        };


        tree_view(test);
        ::this.buildTree();
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
        const subj = this.props.auth.allReqData;
        const { take_subject } = this.props.AuthActions;

        if (!subj) {
            return 'load ...'
        } else {
            let buff = [];
            Object.keys(subj).map((item, index) => {
                buff.push(
                    <div key={index} id={item} onClick={::this.lectionView}>
                        {item}
                    </div>
                );
            });
            take_subject(buff);
        }
    };

    /**
     * @param event
     * @return HTML with lection
     *      @redux - change state with lection
     */
    lectionView(e) {
        const name = e.target.id;
        const data = this.props.auth.allReqData;
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

        });
        take_lection(buff);
    }

    buildTree() {
        let treeData = this.props.auth.treeView;
        buidTree(treeData);
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
                        <h5>subj</h5>
                        {this.props.auth.subj}
                        <hr/>
                    </div>
                    <div className="lections">
                        <h5>lections</h5>
                        {this.props.auth.lections}
                        <hr/>
                    </div>
                    <div className="TelegraphUrl">
                        <h5>url telegraph: {this.props.auth.telegraphUrl}</h5>
                        <a target="_blank" href={this.props.auth.telegraphUrl}>Read Lection</a>
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