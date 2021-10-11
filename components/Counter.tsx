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
            <div className="card">
                <div className="card-body bg-primary">
                    <span className="h2 card-title">{Directions[this.state.direction]} {Persons[this.person]} {this.state.counter}</span>
                </div>
                <div className="card-body">
                    <button className="btn btn-danger ms-1 me-1" onClick={() => this.globalContext.decrement(this.person, this.state.direction)}>-</button>
                    <button className="btn btn-success ms-1 me-1" onClick={() => this.globalContext.increment(this.person, this.state.direction)}>+</button>
                </div>
            </div>
        </div>
    }
}