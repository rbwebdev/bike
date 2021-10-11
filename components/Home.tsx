import * as React from 'react'
import HomeCount from "./HomeCount";
import Counter from "./Counter";
import CounterContext, {Directions, Persons} from "../classes/CounterContext";

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
//@todo clean local storage button
//@todo meteo
//@todo button send by email
//@todo translate
    render() {
        return <div>
            <div className={"home-page " + (this.state.currentStep === Stepper.HOME ? "" : "d-none")}>
                <div className="container">
                    <h1 className="text-center">Comptage Vélo</h1>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            {[Directions.LEFT, Directions.RIGHT, Directions.TOP, Directions.BOTTOM].map((d: Directions) => {
                                return <HomeCount key={'home'+d} globalContext={this.globalContext} direction={d}/>
                            })}

                        </div>
                    </div>
                    <hr/>
                    <div className="d-grid gap-2">
                        <button className="btn btn-block btn-dark" onClick={() => this.setState({...this.state, currentStep: Stepper.STEP1})} >Choix direction</button>
                    </div>
                </div>
            </div>
            <div className={"home-page " + (this.state.currentStep === Stepper.STEP1 ? "" : "d-none")}>
                <div className="container">
                    <h1 className="text-center">Comptage Vélo</h1>
                    <h2 className="text-center">Direction</h2>
                    <hr/>
                    <div className="d-grid gap-2">
                        {[Directions.LEFT, Directions.RIGHT, Directions.TOP, Directions.BOTTOM].map((d: Directions) => {
                            return <button key={'key'+d} className="btn btn-block btn-dark" onClick={() => {this.setState({...this.state, currentStep: Stepper.STEP2}); this.globalContext.direction = d;}}>⬆ Direction {Directions[d]}</button>
                        })}
                        <button className="btn btn-block btn-dark" onClick={() => this.setState({...this.state, currentStep: Stepper.HOME})}>Accueil</button>
                    </div>
                </div>
            </div>
            <div className={"home-page " + (this.state.currentStep === Stepper.STEP2 ? "" : "d-none")}>
                <div className="container">
                    <h1 className="text-center">Comptage Vélo</h1>
                    <h2 className="text-center">Personnes</h2>
                    <hr/>
                    {[Persons.MEN, Persons.WOMEN, Persons.MEN_ACC, Persons.WOMEN_ACC].map((p: Persons) => {
                        return <div key={'counter'+p} >
                            <Counter globalContext={this.globalContext} person={p}/>
                        </div>
                    })}
                    <div className="d-grid gap-2">
                        <button className="btn btn-block btn-dark" onClick={() => this.setState({...this.state, currentStep: Stepper.HOME})} >Accueil</button>
                    </div>
                </div>
            </div>
        </div>
    }
}