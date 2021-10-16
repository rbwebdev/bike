import "@fortawesome/fontawesome-free/js/all";
import * as React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {BrowserRouter} from "react-router-dom";

render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById('app')
)