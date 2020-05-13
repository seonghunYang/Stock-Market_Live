import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BusinessIcon from '@material-ui/icons/Business';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux'

import CompanyItem from './CompanyItem';
import CompanySearchBar from './CompanySearchBar';

export default function CompanyList() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(Array.from( {length:20 }));
  const [hasMore, setHasMore] = React.useState(true);
  const searchedCompanyList = useSelector(state => state.searchedCompanyList);

  const handleClick = () => {
    setOpen(!open);
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
          <BusinessIcon style={{color:"#9575cd"}} />
        </ListItemIcon>
        <ListItemText primary="Company List" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit> 
      <CompanySearchBar  />       
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