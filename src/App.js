import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import Main from './pages/Main';
import StockDetail from './pages/StockDetail';
import { useDispatch, useSelector } from 'react-redux'
import { createCompanyList } from './actions/index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// const s = require('request');


// s('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqgqrufrh5r8lcmqasig', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8)
  },
  content: {
    flexGrow: 1,
    // paddingLeft: drawerWidth,
    marginTop: theme.spacing(8),
    minWidth: "100%"
  },
  toolbar: theme.mixins.toolbar,
}));
function App() {
  const dispatch = useDispatch();
  const companyList = useSelector(state => state.companyList);
  const classes = useStyles();

  useEffect(() => {
    if (companyList) {
      return;
    }
    dispatch(createCompanyList());
  })
  return (
      <Router>
      <Layout />
        <div className={classes.content}>
          <Switch>
            <Route path="/stock/:symbol">
              <StockDetail />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>
    
  );
}

export default App;
