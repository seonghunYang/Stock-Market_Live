import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { useSelector } from 'react-redux';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const DynamicNews = ({news}) => {
  let date = new Date(news.datetime * 1000);
  date = date.toString().slice(0,25);
  return (
    <Card>
      <CardActionArea href={news.url}>
        <CardMedia
          component="img"
          alt="news image"
          height="200"
          image={news.image}
          title="news image"
        />
        <CardContent>
          <Typography  gutterBottom variant="subtitle2" component="p">
            {news.headline}
          </Typography>
          <Typography  gutterBottom variant="body2" color="textSecondary" component="p">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const dynamicNews = useSelector(state => state.dynamicNews);

  return (
    (dynamicNews &&
    <div style={{"padding":"0 60px","maxWidth":"100%","margin":"0 auto","height": "100%"}}>
      {dynamicNews.length === 0 && <h5 style={{fontWeight: "bold"}}>해당 타임라인에 뉴스가 없습니다.</h5>}
      <ItemsCarousel
        infiniteLoop={false}
        gutter={12}
        activePosition={'center'}
        chevronWidth={60}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={window.innerWidth > 600 ? 4 : 1}
        slidesToScroll={1}
        outsideChevron={false}
        showSlither={false}
        firstAndLastGutter={false}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={value => setActiveItemIndex(value)}
        rightChevron={      
        <Button variant="contained" style={{background: "#9575cd"}}>
          <KeyboardArrowRightIcon />
        </Button>}    
        leftChevron={
        <Button variant="contained" style={{background: "#9575cd"}}>
          <KeyboardArrowLeftIcon />
        </Button>
        }
      >
        {dynamicNews.map(news => <DynamicNews key={news.id} news={news} />)}
      </ItemsCarousel>
    </div>)
    
  );
};