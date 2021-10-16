import * as React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CounterContext, {Directions, Persons} from "../classes/CounterContext";
import Counter from "../components/Counter";
import {motion} from "framer-motion";
import {AnimationPageTransition, AnimationPageVariants} from "../components/App";

interface Props {
    globalContext: CounterContext,
}

interface State {
}

export type DirectionParam = {
    direction?: string
}

export default class DirectionCount extends React.PureComponent<Props, State> {
    private readonly globalContext: CounterContext
    private direction: Directions;

    constructor(props: Props) {
        super(props);

        let directionPath = window.location.href.split("/").pop()
        for(let d of [Directions.TOP, Directions.BOTTOM, Directions.LEFT, Directions.RIGHT]) {
            if (directionPath == d) {
                this.direction = d
            }
        }

        this.globalContext = props.globalContext
    }

    render() {
        return <motion.div
            className={"step-2 page"}
            initial="initial"
            animate="in"
            exit="out"
            variants={AnimationPageVariants}
            transition={AnimationPageTransition}
        >
            <div className="header">
                <FontAwesomeIcon icon="id-badge"/> Compteurs
            </div>
            <div className="content">
                <div className="container">
                    <h2 className="text-center">
                        Sens de circulation<br/>
                        <FontAwesomeIcon icon={this.direction} size="2x"/></h2>
                    <hr/>
                    {[Persons.MEN, Persons.MEN_ACC, Persons.WOMEN, Persons.WOMEN_ACC].map((p: Persons) => {
                        return <div key={'counter' + p}>
                            <Counter globalContext={this.globalContext} person={p}/>
                        </div>
                    })}
                </div>
            </div>
        </motion.div>
    }
}