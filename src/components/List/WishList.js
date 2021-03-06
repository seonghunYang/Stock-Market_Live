import React from 'react';
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
import { useAlert } from 'react-alert';
import { types } from 'react-alert';

import {deleteWishlist} from "../../actions/index";

const WishListItem = ({symbol}) => {
  const dispatch = useDispatch();
  const alert = useAlert()

  return(
    <div style={{display:"flex", paddingLeft: 20 }}>
    <ListItem button={true} 
    component={Link}
    to={`/stock/${symbol}`}

    >
      <ListItemText primary={symbol} style={{textAlign: "center"}}/>
    </ListItem>
      <ListItemIcon>
        <IconButton onClick={() => {
            dispatch(deleteWishlist({symbol}))
            alert.show("wishlist를 삭제했습니다.", {type: types.ERROR})
          }}>
          <StarIcon style={{color:"#ffeb3b"}} />
        </IconButton>
      </ListItemIcon>
    </div>
  );
}

export default function WishList() {
  const [open, setOpen] = React.useState(false);
  const wishlist = useSelector(state => state.wishlist);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Typography component="div">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BookmarksIcon style={{color:"#9575cd"}} />
        </ListItemIcon>
        <ListItemText primary="WishList" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {wishlist.length !== 0 && wishlist.map((item, idx) => (
            <WishListItem key={idx} symbol={item.symbol} />
          ))}
          {wishlist.length === 0 && 
          <div></div>
          }

        </List>
      </Collapse>
    </Typography>
  );
}