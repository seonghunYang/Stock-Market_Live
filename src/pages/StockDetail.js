import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'

import { detailInfo } from '../actions/index';
import CompanyProfile from '../components/CompanyProfile';
import CompanyStat from '../components/CompanyStat';
import LiveStock from '../components/LiveStock';
import AreaChart from '../components/AreaChart';
import {addWishlist} from "../actions/index";
import {deleteWishlist} from "../actions/index";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: 0
    },
    flex: {
      display: "flex"
    },
    grid: {
    marginTop: theme.spacing(3),
    width: "100%"
    },
    gridStat: {
    marginTop: theme.spacing(3),
    },
    title: {
      marginBottom:0,
      fontWeight: "bold",
      fontSize: "4.5em"
    },
    text: {
      fontSize: "1.75em"
    }
  })
)

const StockDetail = () => {
  let { symbol } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert()

  const companyInfo = useSelector(state => state.companyInfo);
  const stockInfo = useSelector(state => state.companyStockInfo);
  const candleInfo = useSelector(state => state.companyCandleInfo);
  const wishlist = useSelector(state => state.wishlist);
  
  const checkWishlist= () => {
    let checkWish = false;
    wishlist.map((item) => {
      if(item.symbol === symbol) {
        console.log("wish")
        checkWish = true;
      }
    })
    return checkWish
  }
  
  const [isWishlist, setIsWishlist] = React.useState(() => {
    return checkWishlist();
  });

  useEffect(() => {
    if(companyInfo){
      if(companyInfo.symbol === symbol){
        const bool = checkWishlist();
        setIsWishlist(bool);
        return ;
      }
      else{
        dispatch(detailInfo(symbol));
        const bool = checkWishlist();
        setIsWishlist(bool);
      }
    }
    else{
    dispatch(detailInfo(symbol));
  }
  })


//symbol name  marketCapot... phone weburl industry
//차트와 테이블 area chart 일자별 선택과 candlechart 선택 
//주식시장이 주말에 안열어서 확인 불가능 
  return (
    <>
      {companyInfo && <Container maxWidth="md" className={classes.root}>
        <Grid container spacing={0}>
          <Grid item md={5} className={classes.root}>
            <span className={classes.title}>{companyInfo.symbol}</span>
            <span className={classes.text}>({companyInfo.name})</span>
          </Grid>
          <Grid item md={6} className={classes.flex} alignItems='center' >
              <LiveStock stockInfo={stockInfo} symbol={companyInfo.symbol}/>
          </Grid>
          <Grid item md={1} className={classes.flex} alignItems='center' >
          {!isWishlist &&
            <IconButton onClick={() => {
              setIsWishlist(true);
              dispatch(addWishlist({symbol}))
              alert.show("wishlist에 등록했습니다.", {type: types.SUCCESS})
              }}>
              <StarBorder  fontSize="large" />
            </IconButton>
          }
          {isWishlist &&
            <IconButton onClick={() => {
              setIsWishlist(false);
              dispatch(deleteWishlist({symbol}))
            }} >
              <StarIcon fontSize="large" style={{color:"#ffeb3b"}} />
            </IconButton>
            }          
          </Grid>
          <CompanyProfile companyInfo={companyInfo} />
        </Grid>
        <Grid container spacing={0}>
        {candleInfo &&
          <Grid className={classes.grid} item md={7}>
              <AreaChart type="hybrid" data={candleInfo} />
          </Grid>
        } 
          <Grid className={classes.gridStat} item md={5}>
            <CompanyStat stockInfo={stockInfo} />
          </Grid>   
        </Grid>      
      </Container>}
    </>  
    )
};

export default StockDetail;