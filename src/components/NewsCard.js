//쓸만한 정보 ,
// source, , url

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles({
  root: {
  },
});

export default function NewsCard({ news }) {
  const classes = useStyles();
  let date = new Date(news.datetime);
  date = date.toString().slice(0,25);
  return (
    <Card className={classes.root}>
      <CardActionArea href={news.url}>
        <CardHeader
          title={news.headline}
          subheader={date}
        />
        <CardMedia
          component="img"
          alt="news image"
          height="140"
          image={news.image}
          title="news image"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h2">
            category: {news.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {news.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}