import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../REDUX/ducks/lectionTree'

import { RaisedButton, MenuItem, Toggle,FlatButton, Dialog } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import buildTree from './tree'
import './style.scss'


const buttonStyle = {
    display: "none"
};


class LectionTree extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            course: 3,
            semester: 1,
            saveSetting: false,

            // modal window
            open: false
        }
    }

    /**
     *  @desc - method do request to primat-bot and take all subj/lection
     *          and confirm setting
     */
    componentWillMount() {
        let setting = localStorage.getItem("userSetting");
        let virgin = localStorage.getItem("virgin");


        if (!virgin) {
            this.setState({open: true});
            localStorage.setItem("virgin", true);
        }

        if (setting) {
            setting = JSON.parse(setting);
            this.setState({
                course: setting.course,
                semester: setting.semester,
            }, () => this.doRequest());
        } else {
            this.doRequest()
        }
    }

    doRequest() {

        const { course, semester} = this.state;

        fetch(`https://primat-bot.herokuapp.com/api/abstracts?course=${course}&semester=${semester}&flow=%D0%BA%D0%B2`)
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
                "name": `${this.state.course} курс`,
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
        const { course, semester, saveSetting} = this.state;

        if (saveSetting) {
            let setting  = {
                course: course,
                semester: semester
            };

            localStorage.setItem('userSetting', JSON.stringify(setting));
        }

        this.doRequest();
    }
    
    handleChaneCourse(e, index, value) {
        let semester;

        semester = value === 3 ? 1 : 2;

        this.setState({
            course: value,
            semester: semester
        })
    }

    handleChangeButton(e, index, value) {
        this.setState({
            semester: value
        })
    }

    handleChangeToggle() {
        const { saveSetting } = this.state;
        this.setState({
            saveSetting: !saveSetting
        })
    }

    // modal window
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };



    /**
     * @desc - render component
     * @returns {HTML}
     */
    render() {
        const { course } = this.state;

        const actions = [
            <FlatButton
                label="Закрыть"
                primary={true}
                onClick={this.handleClose}
            />
        ];


        return (
            <div className="wrapper">
                <div className="container">
                    
                    <div className="promo">
                        <div className="typewriter">
                            <h3>
                                Не можешь найти лекцию?
                                Поможем!
                            </h3>
                        </div>
                    </div>

                    <div id="setting">
                        <div id="settingWrapper">
                            <SelectField style = {buttonStyle}>
                                <MenuItem value={1} primaryText="1"  />
                            </SelectField>

                            <br/>
                            <SelectField
                                floatingLabelText="Курс"
                                value={this.state.course}
                                onChange={::this.handleChaneCourse}
                            >
                                <MenuItem value={1} primaryText="1"  disabled = {true}/>
                                <MenuItem value={2} primaryText="2"  />
                                <MenuItem value={3} primaryText="3"  />
                                <MenuItem value={4} primaryText="4"  disabled = {true}/>
                                <MenuItem value={5} primaryText="5"  disabled = {true}/>
                            </SelectField>

                            <br/>

                            <SelectField
                                floatingLabelText="Семестр"
                                value={this.state.semester}
                                onChange={::this.handleChangeButton}
                            >
                                <MenuItem
                                    value={1}
                                    primaryText="1"
                                    disabled = {course === 2 }
                                />
                                <MenuItem
                                    value={2}
                                    primaryText="2"
                                    disabled = {course === 3 }
                                />
                            </SelectField>

                            <br/>

                            <Toggle
                                label="Сохранить?"
                                labelPosition="right"
                                toggled = {this.state.saveSetting}
                                onClick={::this.handleChangeToggle}
                            />
                            <br/>

                            <div className="buttonContainer">
                                <RaisedButton
                                    className = "RaisedButton"
                                    label="Press"
                                    primary={true}
                                    onClick={::this.handlerButtonSubmit}
                                />
                            </div>
                        </div>
                    </div>
                        {/*hack*/}
                    <div className="tree">
                        {/* empty div */}
                    </div>

                    {/* Modal Window */}
                    <div>
                        <Dialog
                            title="Приветик :з"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            Оо, вы первый раз у нас!
                            <br/>
                            #TODO: чет ещё написать
                        </Dialog>
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