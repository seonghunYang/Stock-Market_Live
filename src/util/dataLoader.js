import axios from "axios";

const BASE_URL = "https://finnhub.io/api";
const API_KEY = "bqgqrufrh5r8lcmqasig";

//chart 만들기 위한 데이터 모양으로 변경
function dataProcess(data) {
  const processData = [];
  data.t.forEach((d, idx) => {
    let obj = {};
    let date = new Date(d * 1000);
    obj["close"] = data.c[idx];
    obj["high"] = data.h[idx];
    obj["low"] = data.l[idx];
    obj["open"] = data.o[idx];
    obj["date"] = date;
    obj["volume"] = data.v[idx];
    processData.push(obj);
  });
  return processData;
}

export async function candleDataLoader(symbol, resolution = "D"){
  let date = dateCalculator(resolution);  
  let d = new Date();
  let toDay = parseInt(d.getTime() / 1000); 
  let fromDay = parseInt(d.getTime() / 1000) - 20 * date.loadTime; 
  try{
    const candle_data = await axios(BASE_URL+"/v1/stock/candle", 
      {params: {
        symbol: symbol, 
        resolution: resolution, 
        token: API_KEY, 
        from: fromDay,
        to: toDay
        }}
      );
    if(candle_data.data.s === "no_data") {
      return null;
    }
    const process_candle_data = dataProcess(candle_data.data);
    return process_candle_data;
    }catch(error){
      console.error(error)
    }
} 
export async function createQuote(symbol) {
  try {
    const {data} = await axios(BASE_URL+"/v1/quote", {
      params:{
        symbol: symbol,
        token: API_KEY
    }})
    return data;
  }catch(error){
    console.error(error);
  }
}

export function dateCalculator(resolution){
  let hour = 60 * 60; 
  let days = hour * 24;
  let week = days * 7;
  let year = days * 365;

  if(resolution === "5"){
    let number = 40
    let loadTime = 3 * days
    return {number: number, loadTime: loadTime}  
  }
  if(resolution === "15"){
    let number = 150
    let loadTime = 2 * week
    return {number: number, loadTime: loadTime}  
  }
  if(resolution === "D"){
    let number = 100
    let loadTime = 2 * year
    return {number: number, loadTime: loadTime}  
  }
  if(resolution === "M"){
    let number = 50
    let loadTime = 10 * year
    return {number: number, loadTime: loadTime}  
  }
}