import React, { Component } from 'react';

//Table data before any adding
var data = [
    { name: "Matti", score: 12 },
    { name: "Erkki", score: 35 },
    { name: "Markku", score: 567 },
    { name: "Pentti", score: 1 }
 ]

var sortingNumber = 0; //helps in onSort method

 class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = {
         players: data,
         value1: '',
         value2: ''
      };
      this.handleClick = this.handleClick.bind(this);
   }

   //adds rows to the table
   renderTableData() {
    return this.state.players.map((player) => {
       const { name, score } = player
       const key = name + Math.random(0,100);
       return (
          <tr key={key}>
             <td>{name}</td>
             <td>{score}</td>
          </tr>
       )    
    })
 }

// sorts the table items by points
 onSort(event){
    const data = this.state.players;
    
    if (sortingNumber % 2 === 0 ||sortingNumber % 2 === -0 ) {
    data.sort(function (a, b) {
        return a.score - b.score;
      });
    }
    else {
        data.sort(function (a, b) {
            return b.score - a.score;
          });
    }
    sortingNumber += 1;
    this.setState({
        players: data
      })
  }

// saves new player to data array and refreshes the state.
  handleClick() {
   var obj = null;
    var valueifNaN = 0;
    if (isNaN(this.state.value2) || this.state.value2 < 0 || this.state.value1 === '' || this.state.value2 === '' ) {
      obj = {name: this.state.value1, score:valueifNaN};   
    }
    else { obj = {name: this.state.value1, score:this.state.value2};
    var newData = data;
    newData.push(obj);
    this.setState({
        players: newData,
        value1: '',
        value2: ''
      });}
  }

 render() {
    return (
       <div id ="content">
          <h1 id='title'>Scoreboard service</h1>
          <p>To sort the list by the score, click Points header.</p>
          <table id='players'>
             <tbody>
                <tr>
                <th key="player">PLAYER</th>
                <th key="score"  onClick={e => this.onSort(e)}>POINTS</th>
                </tr>
                {this.renderTableData()}
             </tbody>
          </table>
               <div id="inputs">
               <label id="la" htmlFor="in">Player</label>
               <input id="in" value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
               <label id="la2" htmlFor="in2">Points</label>
               <input id="in2" value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />
               
               <button onClick={this.handleClick}>Add</button>{' '}
               </div>

       </div>
    )
 }
}

export default Table