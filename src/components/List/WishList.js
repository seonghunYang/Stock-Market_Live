import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { IconButton } from '@material-ui/core';

import {deleteWishlist} from "../../actions/index";

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

const WishListItem = ({symbol}) => {
  const dispatch = useDispatch();

  return(
    <ListItem button={true} 
    component={Link}
    to={`/stock/${symbol}`}
    >
      <ListItemText primary={symbol} style={{textAlign: "center"}}/>
      <ListItemIcon>
        <IconButton onClick={() => {
            dispatch(deleteWishlist({symbol}))
          }}>
          <StarIcon style={{color:"#ffeb3b"}} />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}

export default function WishList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const wishlist = useSelector(state => state.wishlist);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Typography component="div">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BookmarksIcon />
        </ListItemIcon>
        <ListItemText primary="WishList" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {wishlist.length !== 0 && wishlist.map((item) => (
            <WishListItem symbol={item.symbol} />
          ))}
          {wishlist.length === 0 && 
          <div></div>
          }

        </List>
      </Collapse>
    </Typography>
  );
}