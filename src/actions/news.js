import axios from 'axios';

const API_KEY = "bqgqrufrh5r8lcmqasig";
const BASE_URL = "https://finnhub.io/api";

export function CreateGeneralNews(category ="general") {
  return async (dispatch) => {
    try{
      const {data} = await axios(BASE_URL+"/v1/news", 
        {params: { category: category, token : API_KEY}});
      data[0]["symbol"] = category;
      dispatch({type: "CREATE_JENERAL_NEWS", payload: data});
    }catch(error) {
      console.error(error);
    }
  }
}

function getFormatDate(date){
  var year = date.getFullYear();              //yyyy
  var month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  var day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return  year + '-' + month + '-' + day;
}

function formatDate() {
  let days = 1000 *60 * 60 * 24;
  let week = days * 7;
  let year = days * 365;
  let today = new Date();
  let fromDay = new Date(today.getTime() - year)
  today = getFormatDate(today);
  fromDay = getFormatDate(fromDay);
  return [today, fromDay];
}

export function SymbolSearchNews(term) {
  return async (dispatch) => {
    try{
      const date = formatDate();
      const{data} = await axios(BASE_URL+"/v1/company-news",{
        params: {
          symbol: term,
          from: date[1],
          to: date[0],
          token: API_KEY
        }
      })
      if(data.length !== 0) {
        data[0]["symbol"] = term;
      }
      console.log(data);
      dispatch({
        type: "CREATE_SYMBOL_NEWS", payload: data
      })
    }catch(error) {
      console.error(error);
    }
  }
}