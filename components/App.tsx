import * as React from 'react'
import CounterContext from "../classes/CounterContext";
import Home from "../pages/Home";
import DirectionsChoice from "../pages/DirectionsChoice";
import DirectionCount from "../pages/DirectionCount";
import Settings from "../pages/Settings";
import Navigation from "./Navigation";
import {BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";

export const AnimationPageVariants = {
    initial: {
        x: "-100vw",
    },
    in: {
        x: 0,
    },
    out: {
        x: "100vw",
    }
};

export const AnimationPageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: .5
};
//
// export default class App extends React.PureComponent<Props, State> {
//     private readonly globalContext: CounterContext;
//
//     constructor(props: Props) {
//         super(props);
//
//         this.globalContext = new CounterContext();
//
//         let theme = localStorage.getItem('theme');
//         if (null === theme) {
//             theme = 'day';
//         }
//         document.body.id = theme;
//         this.state = {
//             theme: theme
//         }
//     }
//
//     switchTheme(): void {
//         let newThem = "dark"
//         if (this.state.theme == 'dark') {
//             newThem = "day"
//         }
//         localStorage.setItem('theme', newThem)
//         document.body.id = newThem
//         this.setState({...this.state, theme: newThem})
//     }
//
//     render() {
//         return <Router>
//             <AnimatePresence exitBeforeEnter>
//                 <Route path="/" exact render={() => <Home globalContext={this.globalContext}/>}/>
//                 <Route path="/directions" exact
//                        render={() => <DirectionsChoice globalContext={this.globalContext}/>}/>
//                 <Route path="/directions/:direction" exact
//                        render={() => <DirectionCount globalContext={this.globalContext}/>}/>
//                 <Route path="/settings" exact render={() => <Settings globalContext={this.globalContext}
//                                                                       switchTheme={this.switchTheme.bind(this)}/>}/>
//             </AnimatePresence>
//             <Navigation/>
//         </Router>
//     }
// }


function App() {
    const location = useLocation();

    const globalContext = new CounterContext();

    let theme = localStorage.getItem('theme');
    if (null === theme) {
        theme = 'day';
    }
    document.body.id = theme

    const switchTheme = () => {
        let newThem = "dark"
        if (theme == 'dark') {
            newThem = "day"
        }
        localStorage.setItem('theme', newThem)
        document.body.id = newThem
        theme = newThem
    }

    return (
        <div>
            <AnimatePresence>
                <Switch location={location} key={location.pathname}>
                    <Route path="/" exact render={() => <Home globalContext={globalContext}/>}/>
                    <Route path="/directions" exact
                           render={() => <DirectionsChoice globalContext={globalContext}/>}/>
                    <Route path="/directions/:direction" exact
                           render={() => <DirectionCount globalContext={globalContext}/>}/>
                    <Route path="/settings" exact render={() => <Settings globalContext={globalContext}
                                                                          switchTheme={switchTheme.bind(this)}/>}/>
                </Switch>
            </AnimatePresence>
            <Navigation/>
        </div>
    );
}

export default App

