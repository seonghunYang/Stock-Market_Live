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
import ListItem from '@material-ui/core/ListItem';


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
    fontWeight: "bold",
  },
  })
)

export default function NewsCard({ news }) {
  const classes = useStyles();
  let date = new Date(news.datetime * 1000);
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
            height="300"
            image={news.image}
            title="news image"
          />
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="subtitle1" component="h2">
              {news.category}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {news.summary}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
}