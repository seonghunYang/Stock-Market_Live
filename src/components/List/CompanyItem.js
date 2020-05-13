import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
//함수로 usestate받기
//wislist인지를 redux에 companylist 넣어서 하면 될 듯
export default function CompanyItem({ index }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchedCompanyList = useSelector(state => state.searchedCompanyList);
  if(index > searchedCompanyList.length -1 || !searchedCompanyList) {
    return (<div></div>)
  }
  const symbol = searchedCompanyList[index].symbol;
  return (
    <ListItem button={true} className={classes.nested}
    component={Link}
    to={`/stock/${symbol}`}
    >
      <ListItemText primary={symbol}
       style={{textAlign: "center"}} />
    </ListItem>
      
  );
}