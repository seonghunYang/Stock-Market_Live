import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import {SymbolSearchNews} from '../actions/news';
//general, forex, crypto, merger->chip. 카테고리, symbol
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: "60%"
    }    
  },
  })
)
export default function () {
  const classes = useStyles();
  const [term, setTerm] = React.useState("");
  const dispatch = useDispatch();

  const change = (term) => {
    setTerm(term);
  }

  return (
    <div className={classes.root} style={{display:"flex"}}>
      <TextField  label="Search field" type="search" 
      id="outlined-full-width"
      fullWidth
      variant="outlined"
      value={term} 
      size="small"
      onChange={(event) => {
        change(event.target.value);
      }}/>
      <Button variant="contained" color="primary" onClick={() => {
        dispatch(SymbolSearchNews(term));
      }}>
        Search
      </Button>
    </div>
  );
}

