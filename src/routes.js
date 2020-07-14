import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/Main';
import Biography from './pages/Biography'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            {/* exact path é como uma rota inicial, mostra qual a primeira pagina da aplicação assim que for executada*/}
            <Route exact path="/" render={() => <Main /> }/>
            <Route path="/biography/:id" component={Biography}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;
