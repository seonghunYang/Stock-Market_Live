import axios from 'axios';

const API_KEY = "bqgqrufrh5r8lcmqasig"
const API_COMPANYLIST_URL = "https://finnhub.io/api/v1/stock/symbol?"

export function createCompanyList() {
  return (dispatch) => {
    axios.get(API_COMPANYLIST_URL, {
      params: {
        exchange: "US",
        token: API_KEY,
      }}).then(({data}) => {
        console.log(data)
        dispatch({type: "CREATE_COMPANYLIST", payload: data});
      })
  }
}

export function SearchCompany(companyList) {
  return {
    type: "SEARCH_COMPANY",
    payload: companyList,
  }
}