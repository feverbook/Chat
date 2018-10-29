import React, { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
//import logo from './logo.svg';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import config from './config.json';
import './main.css';//使用require导入css文件
import ioClient from 'socket.io-client';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const Basic = () => (
  <Router>
    <div>
      <Route exact path="/" component={Words} />
      <Route path="/Friend" component={Friend} />
      <Route path="/Entrance" component={Entrance} />
    </div>
  </Router>
);

class Entrance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <img src={"/entra/pic/QQ20180116215459"} />
        <img src={"/entra/pic/001"} />
        <img src={"/entra/pic/002"} />
        <img src={"/entra/pic/QQ20180116215459"} />
        <img src={"/entra/pic/QQ20180116215459"} />
        <div></div>
      </div>
    )
  }
}

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    console.log('123');

  }

  onClick() {
    window.location.href = "/";
  }


  render() {
    return (
      <div className="friends" onClick={this.onClick}>
        <img src={"/abc/pic/QQ20180116215459"} className="gravatar" />
        <div className="reminder"><p>3</p></div>
        <div className="words">
          <div className="words">{this.props.name}
            <div className="words">·{this.props.distance}</div>
          </div>
          <div className="f-words">{this.props.IndividualResume}</div>
        </div>

      </div>
    )
  }
}

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Lily", distance: "100m", IndividualResume: "NO", peoplelist: [""] };

  }

  componentDidMount() {
    fetch('/abc/data/people')
      .then((response) => {
        return response.json();
      })
      .then((people) => {
        this.setState({ peoplelist: people });
      });



    //  xhrs("/abc/data/people", (result)=>{console.log(result)}, "sendvalue");
  }
  componentWillUnmount() {
    // clearInterval();
  }

  render() {
    let peoplelist = this.state.peoplelist;
    return (<div>
      <div className={"searchBar " + ""} >
        <input className={"inbox"} value="inbox" />
        <div className={"inbox"} >?</div>
      </div>
      {peoplelist.map((item, i) => <People key={i} name={item.name} distance={item.distance} IndividualResume={item.IndividualResume} />)}

    </div>)
  }
}

//对话页面
class Opposite extends React.Component {
  constructor(props) {
    super(props);
    this.state = { head: "../src/QQ图片20180116215459.jpg", value: "对方对话内容对方对话内容对方对话内容", tlaktime: [""] };
  }

  componentDidMount() {

    fetch('/abc/data/time')
      .then((response) => {
        return response.json();
      })
      .then((time) => {
        this.setState({ tlaktime: time });
      })


  }

  render() {

    return (
      <div >
        {/* <p className={"time"}><div className={"dialog " + this.props.className}> <p>{this.props.tlakvalue}</p></div> </p> */}
      </div>

    )
  }
}

class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", chatlist: [{ type: "right", content: "my words" }], searchvalue: "P.Ghani", tlakvalue: [{ type: "left", content: "对方的话" }] };
    this.handleChange = this.handleChange.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/abc/data/words')
      .then((response) => {
        return response.json();
      })
      .then((words) => {
        this.setState({ tlakvalue: words });
        //指向对话框内容this.setState({ tlakvalue: words[Math.floor(Math.random() * 7)] });
        console.log(this.state.chatlist)
      });
    this.socket = ioClient();
    this.socket.on("chatTime", (valuemsg) => {
      console.log(valuemsg);
      this.state.chatlist.push({ type: "left", content: valuemsg });
      this.setState({ chatlist: this.state.chatlist });
    });


  }

  handleChange(event) {
    this.setState({ value: event.target.value });

  }


  onSubmit(event) {
    event.preventDefault();
    this.state.chatlist.push({ type: "right", content: this.state.value }, this.state.tlakvalue[Math.floor(Math.random() * 7)]);

    // this.state.chatlist.push(this.state.tlakvalue);
    console.log(this.state.chatlist);
    this.socket.emit('chat message', this.state.value);//对应服务器同名事件，发送内容至服务器
    this.socket.emit("chatTime", this.state.value);//发送聊天内容

    this.setState({ value: "" }, () => {
      let rootHeight = document.getElementById("root").offsetHeight;
      window.scroll(0, rootHeight)
    });
  }

  searchChange(event) {
    this.setState({ searchvalue: event.target.value });

  }




  render() {
    const chatlist = this.state.chatlist;


    return (
      <div className="background" >
        <div className="searchBar" >
          <Link className="goback" to="/Friend">←</Link>
          <input type="text" className="search" value={this.state.searchvalue} onChange={this.searchChange} />
          <div className="cion">!</div>
        </div>

        {chatlist.map((item, i) => <p key={i} className={"dialog " + item.type}> {item.content}  </p>)}{/*自己的内容*/}

        {/*<p className={"dialog " + item.tpye}>{this.state.tlakvalue.content}</p>/*对方的内容*/}



        <div className="kbback">
          <form onSubmit={this.onSubmit}>
            <input className="keyboard" value={this.state.value} onChange={this.handleChange} />
          </form>
        </div>

      </div >
    )
  }
};



export default Basic;

render(<Basic />, document.getElementById('root'));

