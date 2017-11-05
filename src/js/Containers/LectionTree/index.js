import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../REDUX/ducks/lectionTree'

import { RaisedButton, SelectField, MenuItem } from 'material-ui';
import buildTree from './tree'
import './style.scss'

class LectionTree extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            value: 3
        }
    }

    /**
     *  @desc - method do request to primat-bot and take all subj/lection
     */
    componentWillMount() {
        this.doRequest()
    }

    doRequest() {
        let semestr = this.state.value == 3 ? 1 : 2;
        
        fetch(`https://primat-bot.herokuapp.com/api/abstracts?course=${this.state.value}&semester=${semestr}&flow=%D0%BA%D0%B2`)
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

        take_req_data(data);

        let buff = [];

        let keys = Object.keys(data);
        Object.values(data).map((item, index) => {
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

        let root  = {
                "name": `${this.state.value} курс`,
                "parent": "null",
                "children": buff
        };
        
        tree_view(root);
        ::this.buildTree();
    }


    buildTree() {
        const { treeView } = this.props.auth;
    
        buildTree(treeView, this);
    }

    
    handlerButtonSubmit() {
        this.doRequest();
    }
    
    handleChange(e, index, value) {
        this.setState({
            value: value
        })
    }
    

    /**
     * @desc - render component
     * @returns {HTML}
     */
    render() {
        
        return (
            <div className="wrapper">
                <div className="container">
                    
                    <div className="promo">
                        <div className="typewriter">
                            <h3>
                              Не можешь найти лекцию?
                                &#13;
                                Поможем!
                            </h3>
                        </div>
                    </div>
                    
                    <div className="setting">
                        <SelectField
                            floatingLabelText="Курс"
                            value={this.state.value}
                            onChange={::this.handleChange}
                        >
                            <MenuItem value={1} primaryText="1" disabled={true} />
                            <MenuItem value={2} primaryText="2" />
                            <MenuItem value={3} primaryText="3" />
                            <MenuItem value={4} primaryText="4" disabled={true} />
                            <MenuItem value={5} primaryText="5" disabled={true}  />
                        </SelectField>
                        
                        <button onClick={::this.handlerButtonSubmit}>press</button>
                    </div>
                    
                    <div className="tree">
                    
                    </div>
                    
                    
                    {/*<div className="subject">*/}
                        {/*<input type="text" onChange={(e) => this.setState({input: e.target.value})}/>*/}
                        {/*<button onClick={::this.handlerButtonSubmit}>press</button>*/}
                        {/*{this.state.input}*/}
                        {/*{ treeView === '' ? 'load..' : ''}*/}
                    {/*</div>*/}
                   
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