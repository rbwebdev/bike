import Immutable from "immutable";

export enum Persons {
    MEN,
    MEN_ACC,
    WOMEN,
    WOMEN_ACC,
}

export enum Directions {
    RIGHT,
    LEFT,
    TOP,
    BOTTOM
}

export default class CounterContext {
    private _counters: Immutable.Map<string, number>
    private _direction: Directions

    constructor() {
        //get local storage @todo
        this._counters = Immutable.Map<string, number>();
        this.subscribes = [];
    }

    get counters(): Immutable.Map<string, number> {
        return this._counters;
    }

    get direction(): Directions {
        return this._direction;
    }

    set direction(value: Directions) {
        this._direction = value;
        this.emit()
    }

    counter(person: Persons, direction: Directions): number {
        if (!this._counters.has(CounterContext.key(person, direction))) {
            return 0
        }
        return this._counters.get(CounterContext.key(person, direction));
    }

    static key(person: Persons, direction: Directions): string {
        return person.toString() + direction.toString();
    }

    private readonly subscribes: {(CounterContext): void}[]

    subscribe(fn : (CounterContext) => void): void {
        this.subscribes.push(fn)
    }

    private save() {
        //save local storage this._counters @todo
    }

    private emit(): void {
        for (const fn of this.subscribes) {
            fn(this)
        }
    }

    increment(person: Persons, direction: Directions): void {
        console.log(person, direction)
        let val = this.counter(person, direction);
        val ++;
        this._counters = this._counters.set(CounterContext.key(person, direction), val);
        //save() @todo
        this.emit()
    }

    decrement(person: Persons, direction: Directions): void {
        let val = this.counter(person, direction);
        val --;
        this._counters = this._counters.set(CounterContext.key(person, direction), val);
        //save() @todo
        this.emit()
    }
}