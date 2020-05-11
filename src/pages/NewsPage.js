// card, chip, searchbar 
import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {CreateGeneralNews} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'
import NewsCard from '../components/NewsCard';

export default function NewsPage() {
  const dispatch = useDispatch();
  const generalNews = useSelector(state => state.generalNews);
  useEffect(() => {
    if(!generalNews){
      dispatch(CreateGeneralNews());
    }
  });
  return (
    <>
      {generalNews &&
        <Container maxWidth="md">
          {generalNews.map(news => <NewsCard key={news.id} news={news} />)}
        </Container>
      }
    </>
  );
}