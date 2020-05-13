import React from 'react';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

import {addWishlist} from "../../actions/index";
import {deleteWishlist} from "../../actions/index";
const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
//함수로 usestate받기
export default function CompanyItem({ index }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchedCompanyList = useSelector(state => state.searchedCompanyList);
  const wishlist = useSelector(state => state.wishlist);
  const [isWishlist, setIsWishlist] = React.useState(() => {
    if(index > searchedCompanyList.length -1 || !searchedCompanyList) {
    return false;
    }else{
      const symbol = searchedCompanyList[index].symbol;
      let checkWish = false;
      wishlist.map((item) => {
          if (item.symbol === symbol){
            checkWish = true;
          }
        })
      return checkWish;
    }
  });
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
       {!isWishlist &&
        <ListItemIcon>
          <IconButton onClick={() => {
            setIsWishlist(true);
            dispatch(addWishlist({symbol}))}}>
            <StarBorder  />
          </IconButton>
        </ListItemIcon>
        }
       {isWishlist &&
        <ListItemIcon>
          <IconButton onClick={() => {
            setIsWishlist(false);
            dispatch(deleteWishlist({symbol}))
          }} >
            <StarIcon style={{color:"#ffeb3b"}} />
          </IconButton>
        </ListItemIcon>
        }
    </ListItem>
      
  );
}