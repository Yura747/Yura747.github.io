import React from 'react';
import './App.css';
import './main.scss';

import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
            <Header />
                <Switch>
                    <Route path='/' exact component = { Home } />
                </Switch>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
