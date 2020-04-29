import React from 'react';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function CompanyItem({ index }) {
  const classes = useStyles();
  const searchedCompanyList = useSelector(state => state.searchedCompanyList);
  if(index > searchedCompanyList.length -1 ) {
    return (<div></div>)
  }
  return (
    <ListItem button className={classes.nested}>
      <ListItemText primary={searchedCompanyList[index].symbol}
       style={{textAlign: "center"}} />
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
    </ListItem>
  );
}