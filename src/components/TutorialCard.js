import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import one from '../tutorial_img/1.jpg';
import two from '../tutorial_img/2.jpg';
import three from '../tutorial_img/3.jpg';
import four from '../tutorial_img/4.jpg';
import five from '../tutorial_img/5.jpg';
import six from '../tutorial_img/6.jpg';
import seven from '../tutorial_img/7.jpg';
import eight from '../tutorial_img/8.jpg';
import nine from '../tutorial_img/9.jpg';

const image = [one, two, three, four, five, six, seven, eight, nine];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: '80.25%', // 16:9
  },
  avatar: {
    backgroundColor: "#9575cd" ,
  },
}));

export default function TutorialCard({data}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar 
          sizes="1"
          aria-label="recipe" className={classes.avatar}>
            {data.numbering}
          </Avatar>
        }
        title={data.title}
      />
      <CardMedia
        className={classes.media}
        image={image[data.idx]}
        title={data.title}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {data.content}
        </Typography>
      </CardContent>
    </Card>
  );
}