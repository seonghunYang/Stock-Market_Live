import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import { useAlert } from 'react-alert';
import { types } from 'react-alert';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LoadingOverlay from 'react-loading-overlay';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { detailInfo } from '../actions/index';
import DynamicNews from '../components/DynamicNews';
import CompanyProfile from '../components/CompanyProfile';
import CompanyStat from '../components/CompanyStat';
import LiveStock from '../components/LiveStock';
import AreaChart from '../components/AreaChart';
import CandleStickChart from '../components/CandleStickChart';
import {addWishlist} from "../actions/index";
import {deleteWishlist} from "../actions/index";
import {updateCandle} from "../actions/index";
import {dateCalculator} from "../util/dataLoader";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: 0
    },
    flex: {
      display: "flex"
    },
    grid: {
    // marginTop: theme.spacing(3),
    width: "100%"
    },
    toggleSize: {
      height: "60%",
      width: "30px"
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
    },
    subtitle: {
      fontWeight: "bold",
    },
    paddingY: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(3),
    }
  })
)

const StockDetail = () => {
  let { symbol } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert()
  const [chartChoice, setChartChoice] = React.useState("candle");
  const [resolution, setResolution] = React.useState("D");

  const companyInfo = useSelector(state => state.companyInfo);
  const stockInfo = useSelector(state => state.companyStockInfo);
  const candleInfo = useSelector(state => state.companyCandleInfo);
  const wishlist = useSelector(state => state.wishlist);
  const loading = useSelector(state => state.loading);
  
  let dateInfo = dateCalculator(resolution);

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

  // setValue(newValue);
  const handleChangeChart = (event, newValue) => {
    setChartChoice(newValue);
  };
  
  const handleChangeResolution = (event, newValue) => {
    if(!newValue){
      return ;
    }
    console.log(newValue)
    setResolution(newValue)
    dispatch(updateCandle(symbol, newValue));
    dateInfo = dateCalculator(newValue);
    console.log(dateInfo);
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
        dispatch({type: "INITIAL_NEWS"})
        setResolution("D")
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
              dispatch(addWishlist({symbol: symbol, stockInfo: stockInfo}))
              alert.show("wishlist를 등록했습니다.", {type: types.SUCCESS})
              }}>
              <StarBorder  fontSize="large" />
            </IconButton>
          }
          {isWishlist &&
            <IconButton onClick={() => {
              setIsWishlist(false);
              dispatch(deleteWishlist({symbol}))
              alert.show("wishlist를 삭제했습니다.", {type: types.ERROR})
            }} >
              <StarIcon fontSize="large" style={{color:"#ffeb3b"}} />
            </IconButton>
            }          
          </Grid>
          <CompanyProfile companyInfo={companyInfo} />
        </Grid>
        <Grid container spacing={0}>
        {candleInfo &&
          <Grid component="paper" className={classes.grid} item md={8}> 
            <div className={classes.flex} style={{alignItems: 'center', justifyContent: 'space-around'}}>
              <Tabs
                value={chartChoice}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChangeChart}
                aria-label="disabled tabs example"
              >
                <Tab label="CANDLE" value="candle" />
                <Tab label="AREA" value="area" />
              </Tabs>
              <ToggleButtonGroup size="small" value={resolution} exclusive onChange={handleChangeResolution}>
                <ToggleButton className={classes.toggleSize} value="5">
                  5
                </ToggleButton>
                <ToggleButton className={classes.toggleSize} value="15">
                  15
                </ToggleButton>
                <ToggleButton className={classes.toggleSize} value="D">
                  1D
                </ToggleButton>
                <ToggleButton className={classes.toggleSize} value="M">
                  1M
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            {chartChoice==="area" && 
              <LoadingOverlay
              active={loading}
              spinner
              text='Loading your chart...'
              >
                <AreaChart dateInfo={dateInfo} type="hybrid" data={candleInfo} />
              </LoadingOverlay>
              }
            {chartChoice==="candle" && 
              <LoadingOverlay
              active={loading}
              spinner
              text='Loading your chart...'
              >
                <CandleStickChart symbol={symbol} dateInfo={dateInfo} type="hybrid" data={candleInfo} />
              </LoadingOverlay>
              }
          </Grid>
        } 
          <Grid className={classes.gridStat} item md={4}>
            <CompanyStat stockInfo={stockInfo} />
          </Grid>   
        </Grid> 
        <Divider className={classes.divider} />
        <div className={classes.paddingY}>
          <Typography className={classes.subtitle} component="span" variant="h4">
              CompanyNews
          </Typography>
          <Typography className={classes.subtitle} component="span" variant="subtitle1">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *캔들 차트에 뉴스를 보고 싶은 부분을 클릭해보세요!
          </Typography>
        </div>
        <DynamicNews />     
      </Container>}
    </>  
    )
};

export default StockDetail;