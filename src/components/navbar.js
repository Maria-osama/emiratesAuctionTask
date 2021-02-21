import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../store/actions';

class navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Page 1</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/page2">Page 2</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/page3">Page 3</Link>
                        </li>

                        <select onChange={(e) => this.props.onLanguageChange(e.target.value)}>
                            <option value="" selected disabled hidden>Language</option>
                            <option value="ar">العربية</option>
                            <option value="en" >English</option>
                        </select>

                    </ul>

                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        applanguage: state.appCurrentLanguage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLanguageChange: (langName) => dispatch({ type: actionTypes.CHANGE_LANGUAGE, languageName: langName })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
