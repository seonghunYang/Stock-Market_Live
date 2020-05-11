// card, chip, searchbar 
import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {CreateGeneralNews} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'
import NewsCard from '../components/NewsCard';
import InfiniteScroll from "react-infinite-scroll-component";

export default function NewsPage() {
  const dispatch = useDispatch();
  const generalNews = useSelector(state => state.generalNews);
  const [hasMore, setHasMore] = React.useState(true);
  const [items, setItems] = React.useState(Array.from({length:3}));

  const isMoreData = () => {
    if (items.length >= 20) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from( {length:5 })));
    }, 500);
  }

  useEffect(() => {
    if(!generalNews){
      dispatch(CreateGeneralNews());
    }
  });
  return (
    <>
      {generalNews &&
        <Container maxWidth="md" style={{display:"flex", flexDirection:"column", alignItems:'center'}}>
          <InfiniteScroll
            dataLength={5}
            next={isMoreData}
            hasMore={hasMore}
            height={300}
            loader={<div style={{ textAlign: "center" }}>Loading..</div>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >        
            {generalNews.map(news => <NewsCard key={news.id} news={news} />)}
          </InfiniteScroll>
        </Container>
      }
    </>
  );
}