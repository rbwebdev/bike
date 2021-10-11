import * as React from 'react'
import CounterContext, {Directions, Persons} from "../classes/CounterContext";

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

    render() {
        return <div>
            <div className="row">
                <div className="col"><h2>{Persons[this.person]} ({this.state.counter})</h2></div>
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button className="btn btn-danger btn-large" onClick={() => this.globalContext.decrement(this.person, this.state.direction)}>-</button>
                        <button className="btn btn-success btn-large" onClick={() => this.globalContext.increment(this.person, this.state.direction)}>+</button>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    }
}