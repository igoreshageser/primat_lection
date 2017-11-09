import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import  scrollToComponent from 'react-scroll-to-component';

import * as AuthActions from '../../REDUX/ducks/lectionTree'

import { RaisedButton, MenuItem, Toggle,FlatButton, Dialog, SelectField, AutoComplete  } from 'material-ui';

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
            course: 1,
            semester: 1,
            saveSetting: false,
            educationList: {},
            semesterList: {},
            buffData: '',
            flow: 'кв',
            listFlow: [],

            // modal window
            open: false,
            searchText: ''
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
                flow: setting.flow,
                searchText: setting.flow
            });
        }
    }


    /**
     *  @desc - check user localStorage and save previous data
     *          to state or REDUX
     *          after 2000 ms call modalWindow with some text
     *
     *          call tekeListRequest()
     */
    componentDidMount() {
        let virgin = localStorage.getItem("virgin");

        if (!virgin) {
            setTimeout(::this.handleOpen, 2000);
        }

        ::this.takeFlowRequest();
    }

    takeFlowRequest() {
        const { loader_view } = this.props.AuthActions;
        const { searchText, flow } = this.state;

        loader_view(false);


        fetch(`http://test-primat-bot.herokuapp.com/api/meta`)
            .then(res => res.json())
            .then(d => {
                let res = d.data.reduce((acc, {_id: item}) => acc.includes(item.flow) ? acc : acc.concat(item.flow), []);
                this.setState({
                    buffData: d.data,
                    listFlow: res
                }, () => {
                    if (searchText.length && searchText === flow) {
                        ::this.takeListRequest();
                    }
                })
            })
    }

    /**
     *  @desc - do request and take array with all lection
     *          in res:
     *              flow
     *              course
     *              semester
     *         save res to state or REDUX
     *          call listParse()
     */
    takeListRequest() {
        const { loader_view } = this.props.AuthActions;
        const { buffData } = this.state;

        loader_view(true);

        this.listParse(buffData);
    }

    /**
     * @desc - parse data // search first semester
     * @param data
     * @param value
     */
    listParse(data, value = false) {
        const { loader_view } = this.props.AuthActions;
        const { course, flow } = this.state;

        let buff = {1: [], 2:[], 3:[], 4:[], 5:[]};
        let itter = [];
        let finalRen = [];
        let firstValidSem = false;


        loader_view(false);

        // take course
        data.map((i) => {
            Object.values(i).map((item) => {
                if (item.flow === flow)
                    buff[item.course].push(item)
            });
        });




        // take semester
        Object.values(buff[course]).map((i) => {
            let keys = Object.keys(i);
            Object.values(i).map((item, index) => {
                if (keys[index] === 'semester' && i.flow === flow) {
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

    /**
     * @desc - doRequest and take all lection URL
     */
    doRequest() {
        const { loader_view } = this.props.AuthActions;

        loader_view(true);
        const { course, semester, flow} = this.state;

        fetch(`https://primat-bot.herokuapp.com/api/abstracts?course=${course}&semester=${semester}&flow=${flow}`)
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


    /**
     * @desc  - take data from REDUX and build tree
     */
    buildTree() {
        const { treeView } = this.props.auth;

        buildTree(treeView, this);

        scrollToComponent(this.refs.tree, { offset: 0, align: 'middle', duration: 800, ease:'inCirc'});
    }


    /* ====== Handlers ======  */

    handlerButtonSubmit() {
        const { course, semester, saveSetting, flow } = this.state;
        const { loader_view } = this.props.AuthActions;

        loader_view(false);

        if (saveSetting) {
            let setting  = {
                course: course,
                semester: semester,
                flow: flow
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
            // build valid list; (true - search first valid course)
            ::this.listParse(buffData, value)
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

    handleUpdateInput(searchText) {
        this.setState({
            searchText: searchText,
        });
    }

    handleNewRequest(chosenRequest) {

        this.setState({
            flow: chosenRequest
        }, () => {
            ::this.takeListRequest();
        });
    };


    /**
     * @desc - render component
     * @returns {HTML}
     */
    render() {
        const { course, educationList, semesterList, listFlow } = this.state;

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

                            <AutoComplete
                                floatingLabelText="Поток"
                                searchText={this.state.searchText}
                                onUpdateInput={::this.handleUpdateInput}
                                onNewRequest={::this.handleNewRequest}
                                dataSource={listFlow}
                                filter={(searchText, key) => (key.indexOf(searchText.toLowerCase()) !== -1)}
                                openOnFocus={true}
                            />

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
                                label="Сохранить для следующего посещения?"
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
                    <div className="tree" ref="tree">
                        {/* empty div */}
                    </div>

                    <div className="footer">
                        Мы дарим <img src="../../../assets/img/like.svg" alt="heart"/>
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