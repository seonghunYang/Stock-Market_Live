import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { SearchCompany } from '../../actions/index';

const useStyles = makeStyles((theme) => ({
  nested: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export default function CompanySearchBar() {
  const classes = useStyles();
  const companyList = useSelector(state => state.companyList);
  const [term, setTerm] = React.useState("");
  const dispatch = useDispatch();
  if(term === "") {
    dispatch(SearchCompany(companyList))
  }
  return(
      <TextField id="outlined-search" label="Search Stock" type="search" variant="outlined"
      className={classes.nested}
      size="small"
      value={term}
      onChange={(event) => {
        if(companyList){
          setTerm(event.target.value);
          let searchedCompany = companyList.filter(item =>(item.symbol.indexOf(event.target.value.toUpperCase()) > -1));
          dispatch(SearchCompany(searchedCompany));
        }
      }} />
  );
};