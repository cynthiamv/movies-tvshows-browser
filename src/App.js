import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Category from './components/Category';
import DetailContainer from './components/DetailContainer';
import Footer from './components/Footer';
import styled from 'styled-components';
import SearchResults from "./components/SearchResults";

const MainContainerStyled = styled.main`
@media(min-width: 1200px) {
  margin-left: 6rem;
}
`

const App = () => { 
  return (
    <Router>
      <div className="App">
        <NavBar />
        <MainContainerStyled>
          <Switch>
            <Route exact path="/search/:searchText" component={SearchResults} />
            <Route exact path="/" component={Home} />
            <Route exact path="/:media" component={Category} />
            <Route exact path="/:media" component={Category} />
            <Route exact path="/:media/:id/:attribute" component={DetailContainer} />
          </Switch>
        </MainContainerStyled>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
