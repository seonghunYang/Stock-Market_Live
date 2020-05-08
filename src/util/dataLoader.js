import axios from "axios";

const QUOTE_URL = "https://finnhub.io/api/v1/quote"
const CANDLE_URL = "https://finnhub.io/api/v1/stock/candle"
const TARGET_URL = "https://finnhub.io/api/v1/stock/price-target";
const API_KEY = "bqgqrufrh5r8lcmqasig";

function dataProcessing(quote, candle, target) {

}


export async function currentDataLoader(symbol) {

  try{
  const quote_data = await axios(QUOTE_URL,
    {params: {symbol: symbol, token: API_KEY}}
    );
  const target_data = await axios(TARGET_URL,{
    params: {symbol: symbol, token: API_KEY}
  });
  quote_data.data["targetHigh"] = target_data.data.targetHigh;
  quote_data.data["targetLow"] = target_data.data.targetLow;
  quote_data.data["targetMean"] = target_data.data.targetMean;

  return quote_data.data;

  }catch(error){
    console.error(error)
  }
} 

export async function candleDataLoader(symbol, resolution = "D"){
  let days = 60 * 60 * 24;
  let week = days * 7;
  let year = days * 365;
  let d = new Date();
  let toDay = parseInt(d.getTime() / 1000); 
  let fromDay = parseInt(d.getTime() / 1000) - week - days; 
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
    }catch(error){
      console.error(error)
    }
  } 
