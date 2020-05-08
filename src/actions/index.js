import axios from 'axios';
import {candleDataLoader} from '../util/dataLoader';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const API_COMPANYLIST_URL = "https://finnhub.io/api/v1/stock/symbol";
const API_COMPANYPROFILE_URL = "https://finnhub.io/api/v1/stock/profile2";
const QUOTE_URL = "https://finnhub.io/api/v1/quote"
const TARGET_URL = "https://finnhub.io/api/v1/stock/price-target";
const CANDLE_URL = "https://finnhub.io/api/v1/stock/candle"

export function createCompanyList() {
  return async (dispatch) => {
    try {
      const {data} = await axios(API_COMPANYLIST_URL, {params: {exchange: "US", token : API_KEY}})
      console.log(data);
      dispatch({
        type:"CREATE_COMPANYLIST",
        payload: data
      });
    }catch(error) {
      console.error(error);
    }
  }
}

export function SearchCompany(companyList) {
  return {
    type: "SEARCH_COMPANY",
    payload: companyList,
  }
}



export function detailInfo(symbol) {
  return async (dispatch) => {
    try {

      const {data} = await axios(API_COMPANYPROFILE_URL, 
        {params: { symbol: symbol, token : API_KEY}});

      const quote_data = await axios(QUOTE_URL,
        {params: {symbol: symbol, token: API_KEY}}
        );

      const target_data = await axios(TARGET_URL,{
        params: {symbol: symbol, token: API_KEY}
      });        
      quote_data.data["targetHigh"] = target_data.data.targetHigh;
      quote_data.data["targetLow"] = target_data.data.targetLow;
      quote_data.data["targetMean"] = target_data.data.targetMean;
    
      const candle_data = await candleDataLoader(symbol);

      if(Object.keys(data).length === 0) {
        dispatch({
          type: "CREATE_DETAIL",
          payload: {ticker: symbol, name: "no company information"},
          payload2: quote_data.data,
          payload3: candle_data
        })
      }else{
      dispatch({
        type: "CREATE_DETAIL",
        payload: data,
        payload2: quote_data.data,
        payload3: candle_data
      });
    }
    }catch(error) {
      console.error(error);
    }
  }
}

// export function test() {
//   return async (dispatch) => {
//     try {
//       const result = await axios(API_COMPANYPROFILE_URL, {params: {symbol: "AAPL", token : API_KEY}})
//       console.log(result);
//     }catch(error) {
//       console.error(error);
//     }
    
//   }
// }
                  // await data.forEach(async (i) => {
                  //   const {data} = await axios(API_COMPANYPROFILE_URL, {params: {symbol: i.symbol, token : API_KEY}});
                  //   companyProfiles[i.symbol] = data;
                  // });