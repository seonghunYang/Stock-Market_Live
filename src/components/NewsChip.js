import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { useDispatch } from 'react-redux'

import {CreateGeneralNews} from '../actions/news';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),    
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },  
  },
  }
));


export default function NewsChip() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const ChipItem = ({value, type}) => {
    return (
    <Chip
      avatar={<Avatar>{type}</Avatar>}
      label={`${value} news`}
      clickable
      onClick={() => {
        dispatch(CreateGeneralNews(value));
      }}
      color="primary"
      variant="outlined"
    />)
  }
  

  return (
    <div className={classes.root}>
      <ChipItem value="general" type="C" />
      <ChipItem value="forex" type="C" />
      <ChipItem value="crypto" type="C" />
      <ChipItem value="merger" type="C" />
    </div>
  );
}