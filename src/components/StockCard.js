import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#d1c4e9",
    color: "#fafafa"
  },
  title: {
    fontSize: 14,
  },
});

const ChangeStat = ({changeValue, changeP}) => {
  if(changeValue > 0) {
    return (
    <Typography variant="subtitle1" component="span" style={{display:"inline-flex", alignItems:"center"}}>
      <ArrowDropUpIcon />
      {changeValue}
    </Typography>
    )
  }else {
    return (
    <Typography variant="subtitle1" component="span" style={{display:"inline-flex", alignItems:"center"}}>
      <ArrowDropDownIcon />
      {Math.abs(changeValue)}({changeP}%)
    </Typography>
    )
  }
}

// 상징, 현재 가격, (다운 수준, 퍼센트) => q만 긁어 오면 가능
export default function StockCard( {data} ) {
  const classes = useStyles();
  const changeValue =  Math.round((data.c -data.pc) * 100)  / 100 ;
  const changeP = Math.round((Math.abs(changeValue)/data.pc * 100)*100) / 100;
  return (
    <Card className={classes.root} >
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.symbol}
        </Typography>
        <Typography variant="h5" component="p">
          {data.c}
        </Typography>
        <ChangeStat changeValue={changeValue} changeP={changeP} />
      </CardContent>
    </Card>
  )
}