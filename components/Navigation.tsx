import * as React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

interface Props {
}

interface State {
}

export default class Navigation extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props)
    }

    render() {
        return <div className="nav">
            <div>
                <NavLink to="/settings" exact activeClassName="active" className="btn">
                    <FontAwesomeIcon icon="cog" size="2x"/>
                </NavLink>
            </div>
            <div>
                <NavLink to="/" exact activeClassName="active" className="btn">
                    <FontAwesomeIcon icon="home" size="2x"/>
                </NavLink>
            </div>
            <div>
                <NavLink to="/directions" activeClassName="active" className="btn">
                    <FontAwesomeIcon icon="arrows-alt" size="2x"/>
                </NavLink>
            </div>
        </div>
    }
}