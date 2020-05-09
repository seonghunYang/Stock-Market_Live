import axios from "axios";
import { timeParse } from "d3-time-format";

const CANDLE_URL = "https://finnhub.io/api/v1/stock/candle"
const API_KEY = "bqgqrufrh5r8lcmqasig";
const parseDate = timeParse("%Y-%m-%d");

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
  let days = 60 * 60 * 24;
  let week = days * 7;
  let year = days * 365;
  let d = new Date();
  let toDay = parseInt(d.getTime() / 1000); 
  let fromDay = parseInt(d.getTime() / 1000) - 50 * week - days; 
  try{
    const candle_data = await axios(CANDLE_URL, 
      {params: {
        symbol: symbol, 
        resolution: resolution, 
        token: API_KEY, 
        from: fromDay,
        to: toDay
        }}
      );
    console.log(candle_data.data);
    const process_candle_data = dataProcess(candle_data.data);
    return process_candle_data;
    }catch(error){
      console.error(error)
    }
} 