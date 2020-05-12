import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Link } from "react-router-dom";

import WishList from './WishList';
import CompanyList from './CompanyList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MenuList() {
  const classes = useStyles();


  return (
    <List
      component="nav"
      aria-labelledby="nested-list"
      className={classes.root}
    >
      <CompanyList />
      <WishList />
      <ListItem button
      component={Link}
      to="/news"      
      >
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
    </List>
  );
}