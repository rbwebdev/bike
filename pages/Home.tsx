import * as React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CounterContext, {Directions} from "../classes/CounterContext";
import HomeCount from "../components/HomeCount";
import {motion} from "framer-motion";
import {AnimationPageTransition, AnimationPageVariants} from "../components/App";

interface Props {
    globalContext: CounterContext,
}

interface State {
}


export default class Home extends React.PureComponent<Props, State> {
    private readonly globalContext: CounterContext

    constructor(props: Props) {
        super(props);

        this.globalContext = props.globalContext
    }

    render() {
        return <motion.div
            className={"home-page page"}
            initial="initial"
            animate="in"
            exit="out"
            variants={AnimationPageVariants}
            transition={AnimationPageTransition}
        >
            <div className="header">
                Résumé
            </div>
            <div className="content">
                <table className={'table table-striped table-bordered border-dark'}>
                    <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <td><FontAwesomeIcon icon="male" size="2x"/></td>
                        <td><FontAwesomeIcon icon="male" size="2x"/> <FontAwesomeIcon icon="plus"/></td>
                        <td><FontAwesomeIcon icon="female" size="2x"/></td>
                        <td><FontAwesomeIcon icon="female" size="2x"/> <FontAwesomeIcon icon="plus"/></td>
                    </tr>
                    {[Directions.TOP, Directions.BOTTOM, Directions.LEFT, Directions.RIGHT].map((d: Directions) => {
                        return <HomeCount key={'home'+d} globalContext={this.globalContext} direction={d}/>
                    })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    }
}