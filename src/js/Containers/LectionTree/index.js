import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../REDUX/ducks/lectionTree'

import { RaisedButton, MenuItem, Toggle,FlatButton, Dialog, SelectField } from 'material-ui';

import buildTree from './tree'
import  Spinner  from '../../User interface/spinner/spinner'
import Mouse from '../../User interface/mouse/mouse'
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
            educationList: {},
            semesterList: {},
            buffData: '',

            // modal window
            open: false,
        }
    }

    /**
     *  @desc - method do request to primat-bot and take all subj/lection
     *          and confirm setting
     */
    componentWillMount() {
        const { loader_view } = this.props.AuthActions;

        let setting = localStorage.getItem("userSetting");
        loader_view(true);

        if (setting) {
            setting = JSON.parse(setting);
            this.setState({
                course: setting.course,
                semester: setting.semester,
            }, () => ::this.doRequest());
        }
    }



    componentDidMount() {
        let virgin = localStorage.getItem("virgin");

        if (!virgin) {
            setTimeout(::this.handleOpen, 2000);
        }

        ::this.takeListRequest();
    }


    takeListRequest() {
        const { loader_view } = this.props.AuthActions;
        loader_view(true);

        fetch(`http://test-primat-bot.herokuapp.com/api/meta`)
            .then(res => res.json())
            .then(d => {
                this.listParse(d.data);
                this.setState({
                    buffData: d.data
                });
            })
    }

    listParse(data) {
        const { loader_view } = this.props.AuthActions;
        const { course } = this.state;

        let buff = {1: [], 2:[], 3:[], 4:[], 5:[]};
        let itter = [];
        let finalRen = [];
        let firstValidSem = false;


        loader_view(false);

        // take course
        data.map((i) => {
            Object.values(i).map((item) => {
                buff[item.course].push(item)
            });
        });

        // take semester
        Object.values(buff[course]).map((i) => {
            let keys = Object.keys(i);
            Object.values(i).map((item, index) => {
                if (keys[index] === 'semester') {
                    itter.push(item);
                }
            })
        });

        itter.sort();


        for (let i = 1; i < 3; i++) {
            let searchFirstValid = !firstValidSem && itter.includes(i);

            searchFirstValid ? firstValidSem = i : null;


            finalRen.push(
                <MenuItem
                    value={i}
                    primaryText={i}
                    disabled = { !itter.includes(i) }
                    key={i}
                />
            )
        }

        this.setState({
            educationList: buff,
            semesterList: finalRen,
            semester: firstValidSem
        });
    }

    doRequest() {
        const { loader_view } = this.props.AuthActions;

        loader_view(true);
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
        const { take_req_data, tree_view, loader_view } = this.props.AuthActions;

        loader_view(false);
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
        const { course, semester, saveSetting } = this.state;
        const { loader_view } = this.props.AuthActions;

        loader_view(false);

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
        const { buffData } = this.state;

        this.setState({
            course: value,
        }, () => {
            ::this.listParse(buffData)
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
    handleOpen() {
        this.setState({open: true});
        localStorage.setItem("virgin", true);
    }

    handleClose() {
        this.setState({open: false});
    }



    /**
     * @desc - render component
     * @returns {HTML}
     */
    render() {
        const { course, educationList, semesterList } = this.state;

        const actions = [
            <FlatButton
                label="Закрыть"
                primary={true}
                onClick={::this.handleClose}
            />
        ];

        return (
            <div className="wrapper">
                <div className="container">
                    <Spinner />
                    <div className="promo">
                        <div className="typewriter">
                            <Mouse />
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
                                value={course}
                                onChange={::this.handleChaneCourse}
                            >
                                {
                                    Object.values(educationList).map((i, index) =>
                                        <MenuItem value={index + 1}
                                                  primaryText={index + 1}
                                                  disabled = {!i.length}
                                                  key = {index}
                                        />
                                    )
                                }
                            </SelectField>

                            <br/>

                            <SelectField
                                floatingLabelText="Семестр"
                                value={this.state.semester}
                                onChange={::this.handleChangeButton}
                            >

                                {
                                    Object.values(semesterList).map((item) => {
                                        return item
                                    })
                                }
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
                                    label="Найти лекции"
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