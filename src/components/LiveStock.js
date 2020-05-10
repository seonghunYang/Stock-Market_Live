//실시간 websocket을 여기서 받을지 아니면 위에서 받을지 구조 생각
//아무래도 여기서 받는게 안정적일 듯
//그러면 area는? 추후 차트 추가할 떄 구조 개편이 필요할 듯
//각각의 컴포넌트 차원에서 데이터를 구성하는게 좋을 듯 함
import React, { Component } from "react";

class LiveStock extends Component {
  
  // instance of websocket connection as a class property
  
  componentDidMount() {
    const socket = new WebSocket('wss://ws.finnhub.io?token=bqgqrufrh5r8lcmqasig');
      
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
        console.log("connecting!!")
      });

      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event);
    });


      // this.ws.onclose = () => {
      // console.log('disconnected')
      // // automatically try to reconnect on connection loss

      // }

  }

  render(){
    return <div></div>
  }
}

export default LiveStock;