import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import Main from './pages/Main';
import StockDetail from './pages/StockDetail';
import NewsPage from './pages/NewsPage';
import { createCompanyList } from './actions/index';
import Layout from './components/Layout';

const useStyles = makeStyles((theme) => ({
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
            <Route path="/news">
              <NewsPage />
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
