import Immutable from "immutable";

export enum Persons {
    MEN,
    MEN_ACC,
    WOMEN,
    WOMEN_ACC,
}

export enum Directions {
    RIGHT = 'angle-double-right',
    LEFT = 'angle-double-left',
    TOP = 'angle-double-up',
    BOTTOM = 'angle-double-down'
}

export default class CounterContext {
    private _counters: Immutable.Map<string, number>
    private _direction: Directions

    constructor() {
        this._counters = Immutable.Map<string, number>();
        this.subscribes = [];
        let storageData = localStorage.getItem('counter');
        if (null !== storageData) {
            storageData = JSON.parse(storageData);
            for (const [key, value] of Object.entries(storageData)) {
                this._counters = this._counters.set(value[0].toString(), parseInt(value[1]));
            }
        }
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
        localStorage.setItem('counter', JSON.stringify(this.counters.toArray()));
    }

    private emit(): void {
        for (const fn of this.subscribes) {
            fn(this)
        }
    }

    increment(person: Persons, direction: Directions): void {
        let val = this.counter(person, direction);
        val ++;
        this._counters = this._counters.set(CounterContext.key(person, direction), val);
        this.save()
        this.emit()
    }

    decrement(person: Persons, direction: Directions): void {
        let val = this.counter(person, direction);
        if (val !== 0) {
            val --;
            this._counters = this._counters.set(CounterContext.key(person, direction), val);
            this.save()
            this.emit()
        }
    }
}
