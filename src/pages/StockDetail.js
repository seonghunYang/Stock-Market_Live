import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { detailInfo } from '../actions/index';
import Container from '@material-ui/core/Container';

import CompanyProfile from '../components/CompanyProfile';
const useStyles = makeStyles((theme) => ({
  root: {
    },
    table: {
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
  return (
    <>
      {companyInfo && <Container maxWidth="md">
        <div className={classes.root}>
          <span className={classes.title}>{companyInfo.ticker}</span>
          <span className={classes.text}>({companyInfo.name})</span>
        </div>
          <CompanyProfile companyInfo={companyInfo} />
      </Container>}
    </>  
    )
};

export default StockDetail;