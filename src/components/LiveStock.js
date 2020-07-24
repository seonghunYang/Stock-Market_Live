import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RemoveIcon from '@material-ui/icons/Remove';

class LiveStock extends Component {
  constructor(props) {
    super(props);

    const changeValue =  this.props.stockInfo.c -this.props.stockInfo.pc;
    const changeP = Math.round((Math.abs(changeValue)/this.props.stockInfo.pc * 100)*100) / 100;
    let change = [];
    if (changeValue > 0){
      change = ["+", changeP]
    }else if(changeValue < 0){
      change = ["-", changeP]
    }else{
      change = ["=", changeP]
    }

    this.state = {
      currentPrice : this.props.stockInfo.c,
      changeList: change,
      socket: null
    }
  }
  // instance of websocket connection as a class property

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.symbol !== this.props.symbol){
      const changeValue =  nextProps.stockInfo.c -nextProps.stockInfo.pc;
      const changeP = Math.round((Math.abs(changeValue)/nextProps.stockInfo.pc * 100)*100) / 100;
      let change = [];
      if (changeValue > 0){
        change = ["+", changeP]
      }else if(changeValue < 0){
        change = ["-", changeP]
      }else{
        change = ["=", changeP]
      }   
      if(this.state.socket){
        this.state.socket.send(JSON.stringify({'type':'unsubscribe', 'symbol': this.props.symbol}))
        this.state.socket.send(JSON.stringify({'type':'subscribe', 'symbol': nextProps.symbol}))
      }
      this.setState({
        currentPrice: nextProps.stockInfo.c,
        changeList: change
      })
      return true;
    }
    return true;
  }
  

  componentDidMount() {
    const socket = new WebSocket('wss://ws.finnhub.io?token=bqgqrufrh5r8lcmqasig');
    let setTimer = true;
    socket.onopen = () => {
        // on connecting, do nothing but log it to the console
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': this.props.symbol}))
        console.log('connected')
        this.setState({
          socket: socket
      })
    }
    socket.onmessage = event => {
      // listen to data sent from the websocket server
      const socketData = JSON.parse(event.data)
        if(socketData.type === "ping" || socketData.data[0].s !== this.props.symbol) {
          return;
        }
        if(setTimer){
          const updatePrice = socketData.data[0].p;
          const changeValue =  updatePrice -this.props.stockInfo.pc;
          const changeP = Math.round((Math.abs(changeValue)/this.props.stockInfo.pc * 100)*100) / 100;
          let change = [];
          if (changeValue > 0){
            change = ["+", changeP]
          }else if(changeValue < 0){
            change = ["-", changeP]
          }else{
            change = ["=", changeP]
          }
          setTimer = false;
          this.setState({
            currentPrice: updatePrice,
            changeList: change
        });
      }
    }
      
    setInterval(() => {setTimer=true;
    }, 1000);
  }
  render(){
  return (
    <>
    {(this.state.changeList[0] === "+") &&
      <div >
        <Typography variant="h3" component="span" style={{color:"#2979ff"}}>
          {this.state.currentPrice}
        </Typography>
        <Typography variant="h6" component="span" style={{color:"#2979ff", display:"inline-flex", alignItems:"center"}} >       
          (
          <ArrowDropUpIcon style={{color:"#2979ff"}}></ArrowDropUpIcon>
          {this.state.changeList[1]}%)
        </Typography>
      </div>
      }
    {(this.state.changeList[0] === "-") &&
      <div >
        <Typography variant="h3" component="span" style={{color:"#d32f2f"}}>
          {this.state.currentPrice}
        </Typography>
        <Typography variant="h6" component="span" style={{color:"#d32f2f", display:"inline-flex", alignItems:"center"}} >       
          (
          <ArrowDropDownIcon style={{color:"#d32f2f"}}></ArrowDropDownIcon>
          {this.state.changeList[1]}%)
        </Typography>
      </div>
    }
    {(this.state.changeList[0] === "=") &&
      <div >
        <Typography variant="h3" component="span" style={{color:"#757575"}}>
          {this.state.currentPrice}
        </Typography>
        <Typography variant="h6" component="span" style={{color:"#757575", display:"inline-flex", alignItems:"center"}} >       
          (
          <RemoveIcon style={{color:"#757575"}}></RemoveIcon>
          {this.state.changeList[1]}%)
        </Typography>
      </div>
      }
    </>
  );
  }
}

export default LiveStock;

