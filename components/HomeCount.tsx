import * as React from 'react'
import CounterContext, {Directions, Persons} from "../classes/CounterContext";
import Immutable from "immutable";

interface Props {
    globalContext: CounterContext,
    direction: Directions
}

interface State {
    counters: Immutable.Map<string, number>
}


export default class HomeCount extends React.PureComponent<Props, State> {
    private readonly globalContext: CounterContext;

    constructor(props: Props) {
        super(props);

        this.globalContext = props.globalContext;

        this.state = {
            counters: props.globalContext.counters
        }

        this.globalContext.subscribe((context: CounterContext) => {
            this.setState(
                {...this.state, counters: context.counters}
            )
        })
    }

    counter(person: Persons, direction: Directions): number {
        if (!this.state.counters.has(CounterContext.key(person, direction))) {
            return 0
        }
        return this.state.counters.get(CounterContext.key(person, direction));
    }

    render() {
        return <div>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-primary">
                    <div className="ms-2 me-auto">
                        {Directions[this.props.direction]}
                    </div>
                </li>
                {[Persons.MEN, Persons.WOMEN, Persons.MEN_ACC, Persons.WOMEN_ACC].map((p: Persons) => {
                    return <li key={p} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            {Persons[p]}
                        </div>
                        <span className="badge bg-primary rounded-pill">{this.counter(p, this.props.direction)}</span>
                    </li>
                })}
            </ul>
        </div>
    }
}