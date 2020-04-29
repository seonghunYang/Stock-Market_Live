import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import BusinessIcon from '@material-ui/icons/Business';
import { createCompanyList } from '../../actions/index';
import CompanyItem from './CompanyItem';
import { FixedSizeList } from 'react-window';
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from 'react-redux'

import CompanySearchBar from './CompanySearchBar';

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


export default function CompanyList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(Array.from( {length:20 }));
  const [hasMore, setHasMore] = React.useState(true);
  const dispatch = useDispatch();
  const companyList = useSelector(state => state.companyList);
  const searchedCompanyList = useSelector(state => state.searchedCompanyList);

  const handleClick = () => {
    setOpen(!open);
    if(!companyList){
      dispatch(createCompanyList());
      }
  };
  // 500개 까지만 읽기..뉴스에도 이 알고리즘 들어간다.
  const isMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from( {length:20 })));
    }, 500);
  }
  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Company List" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit> 
      <CompanySearchBar />       
        {searchedCompanyList && 
        <InfiniteScroll
          dataLength={items.length}
          next={isMoreData}
          hasMore={hasMore}
          height={400}
          loader={<div style={{ textAlign: "center" }}>Loading..</div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.map((i, index) => (
            <CompanyItem key={index} index={index} />
          ))}
        </InfiniteScroll>
        }
      </Collapse>
    </div>
  );
}

        // <FixedSizeList height={400} width={200} itemSize={46} itemCount={100}>
        //   CompanyItem
        // </FixedSizeList>