import React, { Component } from 'react';
import { connect } from 'react-redux';

class labelsPage extends Component {

    render() {
        return (
            <div className="label-section container">

                {this.props.labels.map((rec, index) => {

                    return (
                        <p key={index} className="label">{rec[this.props.applanguage]}</p>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        applanguage: state.appCurrentLanguage
    }
}

export default connect(mapStateToProps)(labelsPage);