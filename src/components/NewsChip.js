import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux'

import {CreateGeneralNews} from '../actions/news';
import {SymbolSearchNews} from '../actions/news';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),    
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      width: "60%"
    }    
  },
  }
));


export default function NewsChip() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);

  const ChipItem = ({value, type}) => {
    return (
    <Chip
      avatar={<Avatar>{type}</Avatar>}
      label={`${value} news`}
      clickable
      onClick={() => {
        if(type === "C"){
          dispatch(CreateGeneralNews(value));
        }
        else if(type === "W"){
          dispatch(SymbolSearchNews(value));
        }
        }}
      color={type === "W" ? "primary" : "secondary"}
      variant="outlined"
    />)
  }
  

  return (
    <div className={classes.root}>
      <ChipItem value="general" type="C" />
      <ChipItem value="forex" type="C" />
      <ChipItem value="crypto" type="C" />
      <ChipItem value="merger" type="C" />
      {wishlist.map((item, idx) => (
        <ChipItem key={idx} value={item.symbol} type="W" />
      ))}
    </div>
  );
}