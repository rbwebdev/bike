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
        return <tr>
            <td>{Directions[this.props.direction]}</td>
            {[Persons.MEN, Persons.MEN_ACC, Persons.WOMEN, Persons.WOMEN_ACC].map((p: Persons) => {
                return <td key={p}>
                    <span>{this.counter(p, this.props.direction)}</span>
                </td>
            })}
        </tr>
    }
}