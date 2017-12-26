/**
 *  Copyright (c) 2015-present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint max-len:0 */

import React, {Component} from "react";
import { Link } from "react-router-dom";
import _ from "underscore";
import Flexbox from "flexbox-react";

import Markdown from "react-markdown";
import Prism from "prismjs";
import Highlighter from "./highlighter";
import APIDoc from "./APIDoc";

import Meta from "../examples/examples.json";
import Examples from "../examples/examples.js";
import docsFile from "../api/docs.json";

import { codeRenderer, codeBlockRenderer } from "../renderers";
import { codeStyle, headingStyle, textStyle, groupStyle } from "../styles";

const Example = React.createClass({
    render() {
        const style = {
            display: "inline-block",
            margin: 5,
            padding: 20,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#DDD",
            width: 160,
            height: 160
        };
        const { example } = this.props;
        const name = example.key;
        const imgName = `${name}_thumbnail`;
        const img = Examples[imgName];
        const link = <Link to={`example/${name}`}>{example.value.title}</Link>;
        return (
            <Flexbox flexDirection="column" minWidth="220px">
                <div style={style}>
                    <img src={img} alt={`${name}`} />
                </div>
                <div style={{ paddingLeft: 5, fontSize: "smaller" }}>
                    {link}
                </div>
            </Flexbox>
        );
    }
});

const TaggedExamples = React.createClass({
    render() {
        const exampleList = [];
        _.forEach(Meta, (value, key) => {
            const tags = value.tags;
            if (_.contains(tags, this.props.tag)) {
                exampleList.push({ key, value });
            }
        });
        const examples = exampleList.map((example, i) => {
            return <Example key={i} example={example} />;
        });

        if (examples.length > 0) {
            return (
                <div>
                    <h3>Examples</h3>
                    <Flexbox flexDirection="row" flexWrap="wrap">
                        {examples}
                    </Flexbox>
                </div>
            );
        } else {
            return <div />;
        }
    }
});

export default class extends Component {
    componentDidMount() {
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    render() {
        const component = this.props.match.params.component;
        const path = `src/components/${component}.js`;

        if (!_.has(docsFile, path)) {
            return <div>API could not be found</div>;
        }
        const title = component;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h2 style={headingStyle}>{`${title}`}</h2>
                        <TaggedExamples tag={component} />
                        <APIDoc file={path}/>
                    </div>
                </div>
            </div>
        );
    }
}
