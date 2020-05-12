// chip, searchbar 
import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {CreateGeneralNews} from '../actions/news';
import NewsCard from '../components/NewsCard';
import NewsSearchBar from '../components/NewsSearchBar';
import NewsChips from '../components/NewsChip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: "60%"
    }    
  },
  title: {
    marginBottom:0,
    fontSize: "4.5em"
  },
  })
)

export default function NewsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const news = useSelector(state => state.news);
  const [viewNews, setViewNews] = React.useState(null);
  
  useEffect(() => {
    if(!news) {
      dispatch(CreateGeneralNews())
    }
    if(news && news.length === 0) {
      return;
    }
    if(news && !viewNews) {
      setViewNews(news.slice(0,5));
    }
    if(news && viewNews && viewNews[0].symbol !== news[0].symbol){
      setViewNews(news.slice(0,5));
    }
  });

  return (
    <>
      {viewNews &&
        <Container maxWidth="md" style={{display:"flex", flexDirection:"column", alignItems:'center'}}>
            <div className={classes.title}>News</div>
            <NewsChips />
            <NewsSearchBar/>
            {news.length === 0 && <div>뉴스가 없습니다. 다른 symbol로 검색해주세요</div>}
            {viewNews.map(news => <NewsCard key={news.id} news={news} />)}
            {viewNews.length !== news.length &&
            <Button 
            variant="outlined" 
            color="primary" 
            className={classes.root}
            onClick={() => {
              setViewNews(news.slice(0,viewNews.length + 5));
            }}>
              더보기
              <ExpandMoreIcon />
            </Button>
          }
        </Container>
      }
    </>
  );
}