import * as React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CounterContext, {Directions} from "../classes/CounterContext";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {AnimationPageTransition, AnimationPageVariants} from "../components/App";

interface Props {
    globalContext: CounterContext,
}

interface State {
}


export default class DirectionsChoice extends React.PureComponent<Props, State> {
    private readonly globalContext: CounterContext

    constructor(props: Props) {
        super(props);

        this.globalContext = props.globalContext
    }

    render() {
        return <motion.div
            className={"step-1 page"}
            initial="initial"
            animate="in"
            exit="out"
            variants={AnimationPageVariants}
            transition={AnimationPageTransition}
        >
            <div className="header">
                Sens de circulation du vélo
            </div>
            <div className="content">
                <div className="row btn-left">
                    <div className="col col-8 text-center">
                        <div className="circle"/>
                    </div>
                    <div className="col col-4 text-center">
                        <Link to={"directions/" + Directions.LEFT} className="btn btn-block btn-dark btn-block">
                            <FontAwesomeIcon icon={Directions.LEFT} size="2x"/>
                        </Link>
                        <br/>
                        <br/>
                        <div className="trait"/>
                        <br/>
                        <Link to={"directions/" + Directions.RIGHT} className="btn btn-block btn-dark btn-block">
                            <FontAwesomeIcon icon={Directions.RIGHT} size="2x"/>
                        </Link>
                    </div>
                </div>
                <br/>
                <div className="row btn-bottom">
                    <div className="col col-8">
                        <div className="row">
                            <div className="col col-6 text-center border-right">
                                <Link to={"directions/" + Directions.BOTTOM}
                                      className="btn btn-block btn-dark btn-block">
                                    <FontAwesomeIcon icon={Directions.BOTTOM} size="2x"/>
                                </Link>
                            </div>
                            <div className="col col-6 text-center">
                                <Link to={"directions/" + Directions.TOP} className="btn btn-block btn-dark btn-block">
                                    <FontAwesomeIcon icon={Directions.TOP} size="2x"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    }
}