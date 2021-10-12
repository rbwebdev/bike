import * as React from 'react'
import HomeCount from "./HomeCount";
import Counter from "./Counter";
import CounterContext, {Directions, Persons} from "../classes/CounterContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
}

interface State {
    currentStep: Stepper
}

enum Stepper {
    HOME,
    STEP1,
    STEP2
}
export default class Home extends React.PureComponent<Props, State> {
    private readonly globalContext: CounterContext;

    constructor(props: Props) {
        super(props);

        this.globalContext = new CounterContext();

        this.state = {
            currentStep: Stepper.HOME
        }
    }

    render() {
        return <div>
            <div className={"home-page " + (this.state.currentStep === Stepper.HOME ? "" : "d-none")}>
                <div className="container">
                    <h1 className="text-center">Comptage Vélo</h1>
                    <h2 className="text-center">Résumé</h2>
                    <hr/>
                    <table className={'table table-striped'}>
                        <tr>
                            <td>&nbsp;</td>
                            <td>{Persons[Persons.MEN]}</td>
                            <td>{Persons[Persons.MEN_ACC]}</td>
                            <td>{Persons[Persons.WOMEN]}</td>
                            <td>{Persons[Persons.WOMEN_ACC]}</td>
                        </tr>
                        {[Directions.TOP, Directions.BOTTOM, Directions.LEFT, Directions.RIGHT].map((d: Directions) => {
                            return <HomeCount key={'home'+d} globalContext={this.globalContext} direction={d}/>
                        })}
                    </table>
                </div>
            </div>
            <div className={"home-page " + (this.state.currentStep === Stepper.STEP1 ? "" : "d-none")}>
                <div className="container">
                    <h1 className="text-center">Comptage Vélo</h1>
                    <h2 className="text-center">Le vélo arrive depuis</h2>
                    <hr/>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        {[Directions.TOP, Directions.BOTTOM].map((d: Directions) => {
                            return <button key={'key'+d} className="btn btn-block btn-dark" onClick={() => {this.setState({...this.state, currentStep: Stepper.STEP2}); this.globalContext.direction = d;}}>{Directions[d]}</button>
                        })}
                    </div>
                    <hr/>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        {[Directions.LEFT, Directions.RIGHT].map((d: Directions) => {
                            return <button key={'key'+d} className="btn btn-block btn-dark" onClick={() => {this.setState({...this.state, currentStep: Stepper.STEP2}); this.globalContext.direction = d;}}>{Directions[d]}</button>
                        })}
                    </div>
                    <hr/>
                </div>
            </div>
            <div className={"home-page " + (this.state.currentStep === Stepper.STEP2 ? "" : "d-none")}>
                <div className="container">
                    <h1 className="text-center">Comptage Vélo</h1>
                    <h2 className="text-center">Personnes venant depuis {Directions[this.globalContext.direction]}</h2>
                    <hr/>
                    {[Persons.MEN, Persons.MEN_ACC, Persons.WOMEN, Persons.WOMEN_ACC].map((p: Persons) => {
                        return <div key={'counter'+p} >
                            <Counter globalContext={this.globalContext} person={p}/>
                        </div>
                    })}
                </div>
            </div>
            <div className="nav">
                <div className="trash sub">
                    <div className="btn btn-danger" onClick={() => {localStorage.removeItem('counter'); location.reload();}}>
                        <FontAwesomeIcon icon="trash" size="2x"/>
                    </div>
                </div>
                <div className="home sub">
                    <div className="btn btn-dark" onClick={() => this.setState({...this.state, currentStep: Stepper.HOME})}>
                        <FontAwesomeIcon icon="home" size="2x"/>
                    </div>
                </div>
                <div className="step1 sub">
                    <div className="btn btn-success" onClick={() => this.setState({...this.state, currentStep: Stepper.STEP1})}>
                        <FontAwesomeIcon icon="arrows-alt" size="2x"/>
                    </div>
                </div>
            </div>
        </div>
    }
}