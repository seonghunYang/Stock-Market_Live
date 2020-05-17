import axios from 'axios';
import {createQuote} from '../util/dataLoader';
import {candleDataLoader} from '../util/dataLoader';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const BASE_URL = "https://finnhub.io/api";

let wishlist = [];


export function createCompanyList() {
  return async (dispatch) => {
    try {
      const {data} = await axios(BASE_URL+"/v1/stock/symbol", {params: {exchange: "US", token : API_KEY}})
      const loadedWishlist = await localStorage.getItem('wishlist');
      let parsedWishlist = [];
      if (loadedWishlist !== null) {
        parsedWishlist = JSON.parse(loadedWishlist);
      }
      wishlist = Object.values(parsedWishlist);
      
      let importantStockQuote = [];

      let AAPL_data = await createQuote("AAPL");
      AAPL_data["symbol"] = "AAPL"
      let MSFT_data = await createQuote("MSFT");
      MSFT_data["symbol"] = "MSFT"
      let AMZN_data = await createQuote("AMZN");
      AMZN_data["symbol"] = "AMZN"
      let GOOGL_data = await createQuote("GOOGL");
      GOOGL_data["symbol"] = "GOOGL"
      importantStockQuote = [AAPL_data, MSFT_data, AMZN_data, GOOGL_data];
      dispatch({
        type:"CREATE_COMPANYLIST",
        payload: data,
        wishlist: parsedWishlist,
        importantStock : importantStockQuote
      });
    }catch(error) {
      console.error(error);
    }
  }
}
//return


export function SearchCompany(companyList) {
  return {
    type: "SEARCH_COMPANY",
    payload: companyList,
  }
}

export function detailInfo(symbol) {
  return async (dispatch) => {
    try {
      const {data} = await axios(BASE_URL+"/v1/stock/profile2", 
        {params: { symbol: symbol, token : API_KEY}});
      data["symbol"] = symbol;

      const quote_data = await axios(BASE_URL+"/v1/quote",
        {params: {symbol: symbol, token: API_KEY}}
        );

      const target_data = await axios(BASE_URL+"/v1/stock/price-target",{
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

export function updateCandle(symbol, resolution) {
  return async (dispatch) => {
    try{
      dispatch({type:"START_LOADING"});
      const candle_data = await candleDataLoader(symbol, resolution);
      dispatch({
        type: "UPDATE_CANDLEINFO", payload: candle_data
      })
      dispatch({type:"END_LOADING"});
    }catch(error) {
      console.error(error)
    }
  }
} 



function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

export function addWishlist (data) {
  wishlist.push(data);
  saveWishlist();
  return ({
    type: "ADD_WISHLIST", symbol: data
  });
}

export function deleteWishlist (symbol) {
  const cleanwishlist = wishlist.filter((item) => {  //true만 남김
    return item.symbol !== symbol.symbol;
  });
  wishlist = cleanwishlist;
  saveWishlist();
  return ({
    type: "DELETE_WISHLIST", symbol: symbol
  })
}