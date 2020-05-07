import axios from 'axios';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const API_COMPANYLIST_URL = "https://finnhub.io/api/v1/stock/symbol";
const API_COMPANYPROFILE_URL = "https://finnhub.io/api/v1/stock/profile2";

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
      console.log(data);
      if(Object.keys(data).length === 0) {
        dispatch({
          type: "CREATE_DETAIL",
          payload: {ticker: symbol, name: "no company information"}
        })
      }else{
      dispatch({
        type: "CREATE_DETAIL",
        payload: data
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