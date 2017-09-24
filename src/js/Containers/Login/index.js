import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../REDUX/ducks/auth'
import ModalWindow from '../../User interface/modal'

import './style.scss'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: ''
        }
    }


    /**
     *  @desc - method do request to primat-bot and take all subj/lection
     */
    componentWillMount() {
        fetch('https://primat-bot.herokuapp.com/api/abstracts?course=2&semester=2&flow=%D0%BA%D0%B2')
            .then(res => res.json())
            .then(d => {
                ::this.dataParse(d.data);
            })
            // .catch((err) => console.error('some error :c'))

        // this.oylol()
    }

    /**
     * @param data (request data)
     * @desc -  change state with subject
     */
    dataParse(data) {
        const { take_req_data } = this.props.AuthActions;
        const kek = data;

        take_req_data(data);
        ::this.subjView();

        let buff = [];

        let keys = Object.keys(data);
        // console.log(keys)
        Object.values(kek).map((item, index) => {
          let subject = {
              "name": keys[index],
              "children": []
          };

          item.map((lec) => {
              console.log(lec.name)
              let lection = {
                  "name": lec.name,
                  // "children": lec.telegraph_url
              }
              subject.children.push(lection);
          });

          buff.push(subject);
        });

        let test =
            {
                "name": "2 курс",
                "parent": "null",
                "children": buff
            }


        this.setState({
            test: test
        });
        console.log(test);

        ::this.oylol();
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

    oylol() {

        // let treeData = [
        //     {
        //         "name": "Top Level",
        //         "parent": "null",
        //         "children": [
        //             {
        //                 "name": "Level 2: A",
        //                 "parent": "Top Level",
        //                 "children": [
        //                     {
        //                         "name": "Son of A",
        //                     },
        //                     {
        //                         "name": "Daughter of A",
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "Level 2: B",
        //                 "parent": "Top Level"
        //             }
        //         ]
        //     }
        // ];
        //
        //
        // console.log('tree >>>>', treeData);

        let treeData = this.state.test;
        console.log('state >>>>', this.state.test);

        // let treeData = this.state.test;



// ************** Generate the tree diagram	 *****************
        let margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;

        let i = 0,
            duration = 750;

        let root;

        let tree = d3.layout
            .tree()
            .size([height, width]);

        let diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        let svg = d3.select("body").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        root = treeData;
        root.x0 = height / 2;
        root.y0 = 0;

        console.log('root >> ',root);

        // expand(root);
        // update(root);

        collapseAll()


        d3.select(self.frameElement).style("height", "500px");


        function collapseAll(){
            root.children.forEach(collapse);
            collapse(root);
            update(root);
        }

        function update(source) {

            // Compute the new tree layout.
            let nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            let node = svg.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            let nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click);

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("text")
                .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            let nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 10)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            let nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            let link = svg.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    let o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    let o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

// Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }


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

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));