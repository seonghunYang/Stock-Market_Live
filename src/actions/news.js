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

function formatDate(Todate, use) {
  let days = 1000 *60 * 60 * 24;
  let year = days * 365;
  if(use === "0"){
    let today = new Date();
    let fromDay = new Date(today.getTime() - year)
    today = getFormatDate(today);
    fromDay = getFormatDate(fromDay);
    return [today, fromDay];
  }
  else if (use === "1") {
    let today = new Date(Todate);
    let fromDay = new Date(today.getTime() - days)
    today = getFormatDate(today);
    fromDay = getFormatDate(fromDay);
    return [today, fromDay]
  }
}

//use === 0 => 뉴스페이지 뉴스, use === 1 다이나믹 뉴스(상세 페이지)
export function SymbolSearchNews(term, Todate = new Date(), use = "0") {
  return async (dispatch) => {
    try{
      const date = formatDate(Todate, use);
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
      dispatch({
        type: "CREATE_SYMBOL_NEWS", payload: data, use: use
      })
    }catch(error) {
      console.error(error);
    }
  }
}