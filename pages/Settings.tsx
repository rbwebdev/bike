import * as React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CounterContext from "../classes/CounterContext";
import {motion} from "framer-motion";
import {AnimationPageTransition, AnimationPageVariants} from "../components/App";

interface Props {
    globalContext: CounterContext,
    switchTheme: () => void
}

interface State {
}


export default class Settings extends React.PureComponent<Props, State> {
    private readonly globalContext: CounterContext

    constructor(props: Props) {
        super(props);

        this.globalContext = props.globalContext
    }

    deleteCountersStored() {
        if (confirm("Etes vous sûr de vouloir supprimer toutes les données des compteurs ? Cette opération est irréversible !")) {
            localStorage.removeItem('counter');
            location.reload();
        }
    }

    render() {
        return <motion.div
            className={"params page"}
            initial="initial"
            animate="in"
            exit="out"
            variants={AnimationPageVariants}
            transition={AnimationPageTransition}
        >
            <div className="header">
                <FontAwesomeIcon icon="cog"/> Settings
            </div>
            <div className="content">
                <div className="container pt-2">
                    <div onClick={this.props.switchTheme}>
                        <FontAwesomeIcon icon="adjust"/> Switcher de thème
                    </div>
                    <hr/>
                    <div className="text-danger" onClick={this.deleteCountersStored}>
                        <FontAwesomeIcon icon="trash"/> Supprimer les données des compteurs
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>
        </motion.div>
    }
}