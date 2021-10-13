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
    STEP2,
    PARAMS
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
            <br/>
            <div className="text-center">
                <FontAwesomeIcon icon="bicycle" size="4x"/>
            </div>
            <hr/>
            <div className={"home-page " + (this.state.currentStep === Stepper.HOME ? "" : "d-none")}>
                <h2 className="text-center">Résumé</h2>
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
            <div className={"step-1 " + (this.state.currentStep === Stepper.STEP1 ? "" : "d-none")}>
                <h2 className="text-center">Sens de circulation du vélo</h2>
                <div className="row btn-left">
                    <div className="col col-8 text-center">
                        <div className="circle">&nbsp;
                        </div>
                    </div>
                    <div className="col col-4">
                        <button className="btn btn-block btn-dark btn-block" onClick={() => {this.setState({...this.state, currentStep: Stepper.STEP2}); this.globalContext.direction = Directions.LEFT;}}>{Directions.LEFT}</button>
                        <br/>
                        <div className="trait">&nbsp;</div>
                        <br/>
                        <button className="btn btn-block btn-dark btn-block" onClick={() => {this.setState({...this.state, currentStep: Stepper.STEP2}); this.globalContext.direction = Directions.RIGHT;}}>{Directions.RIGHT}</button>
                    </div>
                </div>
                <br/>
                <div className="row btn-bottom">
                    <div className="col col-8">
                        <div className="row">
                            <div className="col col-6 text-center border-right">
                                <button className="btn btn-block btn-dark btn-block" onClick={() => {this.setState({...this.state, currentStep: Stepper.STEP2}); this.globalContext.direction = Directions.LEFT;}}>{Directions.BOTTOM}</button>
                            </div>
                            <div className="col col-6 text-center">
                                <button className="btn btn-block btn-dark btn-block" onClick={() => {this.setState({...this.state, currentStep: Stepper.STEP2}); this.globalContext.direction = Directions.LEFT;}}>{Directions.TOP}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-4">&nbsp;</div>
                </div>
            </div>
            <div className={"home-page " + (this.state.currentStep === Stepper.STEP2 ? "" : "d-none")}>
                <div className="container">
                    <h2 className="text-center">Sens de circulation : {this.globalContext.direction}</h2>
                    <hr/>
                    {[Persons.MEN, Persons.MEN_ACC, Persons.WOMEN, Persons.WOMEN_ACC].map((p: Persons) => {
                        return <div key={'counter'+p} >
                            <Counter globalContext={this.globalContext} person={p}/>
                        </div>
                    })}
                </div>
            </div>
            <div className={"params " + (this.state.currentStep === Stepper.PARAMS ? "" : "d-none")}>
                <div className="container">
                    <div className="text-center">
                        <h2>Supprimer la data</h2>
                        <div className="btn btn-danger" onClick={() => {localStorage.removeItem('counter'); location.reload();}}>
                            <FontAwesomeIcon icon="trash" size="2x"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav">
                <div className="trash sub">
                    <div className="btn btn-danger" onClick={() => this.setState({...this.state, currentStep: Stepper.PARAMS})}>
                        <FontAwesomeIcon icon="cog" size="2x"/>
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