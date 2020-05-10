import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { detailInfo } from '../actions/index';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CompanyProfile from '../components/CompanyProfile';
import CompanyStat from '../components/CompanyStat';
import LiveStock from '../components/LiveStock';
import { TypeChooser } from "react-stockcharts/lib/helper";

import AreaChart from '../components/AreaChart';
const useStyles = makeStyles((theme) => ({
    root: {
      paddingRight: 0
    },
    grid: {
    marginTop: theme.spacing(3),
    width: "100%"
    },
    gridStat: {
    marginTop: theme.spacing(3),
    },
    typeChooser: {
      display: "none"
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
  const dispatch = useDispatch();
  const companyInfo = useSelector(state => state.companyInfo);
  const stockInfo = useSelector(state => state.companyStockInfo);
  const candleInfo = useSelector(state => state.companyCandleInfo);
  const classes = useStyles();
  useEffect(() => {
    if(companyInfo){
      if(companyInfo.ticker === symbol){
        return ;
      }
      else{
        dispatch(detailInfo(symbol));
      }
    }
    else{
    dispatch(detailInfo(symbol));
  }
  })
//ticker name  marketCapot... phone weburl industry
//차트와 테이블 area chart 일자별 선택과 candlechart 선택 
//주식시장이 주말에 안열어서 확인 불가능 ㅋㅋ
  return (
    <>
      {companyInfo && <Container maxWidth="md" className={classes.root}>
        <Grid container spacing={0}>
        <div className={classes.root}>
          <span className={classes.title}>{companyInfo.ticker}</span>
          <span className={classes.text}>({companyInfo.name})</span>
        </div>
          <CompanyProfile companyInfo={companyInfo} />
        {candleInfo &&
        <Grid className={classes.grid} item md={7}>
            <AreaChart type="hybrid" data={candleInfo} />
        </Grid>
        } 
        <Grid className={classes.gridStat} item md={5}>
          <CompanyStat stockInfo={stockInfo} />
        </Grid>
          
        </Grid>
      
        <LiveStock />
      </Container>}
    </>  
    )
};

export default StockDetail;