import * as React from 'react'
import CounterContext, {Directions, Persons} from "../classes/CounterContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    globalContext: CounterContext,
    person: Persons
}

interface State {
    counter: number
    direction: Directions
}

export default class Counter extends React.PureComponent<Props, State> {
    private readonly globalContext: CounterContext
    private readonly person: Persons

    constructor(props: Props) {
        super(props)

        this.globalContext = props.globalContext
        this.person = props.person

        this.state = {
            counter: props.globalContext.counter(this.person, Directions.RIGHT),
            direction: Directions.RIGHT
        }

        this.globalContext.subscribe((context: CounterContext) => {
            this.setState(
                {...this.state, counter: context.counter(this.person, context.direction), direction: context.direction}
            )
        })
    }
    renderPerson(p) {
        switch (p) {
            case 0:
                return (
                    <span>
                        <FontAwesomeIcon icon="male" size="2x"/>
                    </span>
                )
            case 1:
                return (
                    <span>
                        <FontAwesomeIcon icon="male" size="2x"/>&nbsp;
                        <FontAwesomeIcon icon="plus"/>
                    </span>
                )
            case 2:
                return (
                    <span>
                        <FontAwesomeIcon icon="female" size="2x"/>
                    </span>
                )
            case 3:
                return (
                    <span>
                        <FontAwesomeIcon icon="female" size="2x"/>&nbsp;
                        <FontAwesomeIcon icon="plus"/>
                    </span>
                )
        }
    }
    render() {
        return <div>
            <div className="row">
                <div className="col col-8">
                    <h2>
                        <span className="badge rounded-pill bg-dark">{this.state.counter}</span>&nbsp;
                        {this.renderPerson(this.person)}
                    </h2>
                </div>
                <div className="col col-4">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button className="btn btn-warning btn-large" onClick={() => this.globalContext.decrement(this.person, this.state.direction)}>
                            <FontAwesomeIcon icon="minus" size="2x"/>
                        </button>
                        <button className="btn btn-success btn-large" onClick={() => this.globalContext.increment(this.person, this.state.direction)}>
                            <FontAwesomeIcon icon="plus" size="2x"/>
                        </button>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    }
}