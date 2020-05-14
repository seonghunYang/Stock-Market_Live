import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import StockCard from "../components/StockCard";
import Stepper from "../components/Stepper";
const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(2),
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  mainCard: {
    marginTop: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(3),
  }
})
)

//appl 아마존 ms googl
export default function Main() {
  const classes = useStyles();
  const importantStock = useSelector(state => state.importantStock);
  const wishlist = useSelector(state => state.wishlist);
  
  if(importantStock){
  console.log(importantStock[0])
  }
  return (
    <>
      <Container maxWidth="md">
        <Typography className={classes.title} component="div" variant="h3">
          Hello World!
        </Typography>
        <Typography className={classes.subTitle} component="div" variant="subtitle1">
          환영합니다! 이 웹은 실시간으로 주식 정보를 볼 수 있도록 도와줄 것 입니다. <br/>
          주식을 검색하고 실시간으로 정보를 확인해보세요! <br/>
          관심 있는 주식은 wishlist에 등록하여 빠르게 접근 하고 확인하실 수 있습니다. <br/>
          그 외에도 stock 뉴스 등 다양한 컨텐츠가 있으니 우리 웹과 함께 주식 시장에서 승리하세요!
        </Typography>
        <Divider />
        <Typography className={classes.title} component="div" variant="h5">
          Main company
        </Typography>
        <Grid container spacing={3}>
          {importantStock && 
          importantStock.map((item) => (
            <Grid item md={3} className={classes.mainCard}>
              <StockCard data={item} />
            </Grid>
          ))
        }
        </Grid>
        <Divider className={classes.divider} />
        <Typography className={classes.title} component="div" variant="h5">
            Tutorial
        </Typography>
        <Stepper />
      </Container>
    </>
  );
}