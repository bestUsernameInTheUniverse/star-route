// process.env.UV_THREADPOOL_SIZE=8;
import React, { Component } from 'react';
import './App.css';

const axios = require('axios');

class App extends Component {
  constructor() {
    super();

    this.state = {
      stars: [],
      map: '',
      question: ''
    }
  }


  componentWillMount() {
    // this.updateMap();
    // axios
    //   .get('http://192.168.1.63:5000/api/nodes')
    //   .then(response => this.setState({ stars: response.data }))
    //   .catch(error => console.log(error));
  }

  handleClick = (e) => {
    // this.updateMap();
    this.answerQuestions(1);
  }


  answerQuestions = (times) => {
    for(let i = 0; i < times; i++) {
      axios
      .get('https://random-questions-ijadnjmihb.now.sh/question')
      .then(response => this.answer(response.data))
      .catch(error => console.log(error));
    }
  }

  answer = (question) => {
    const q = question.instructions;
    var myAnswer;

    if(q.includes('Reverse this paragraph:')) {
      myAnswer = q.slice(23).split('').reverse().join('');
    }

    if(q.includes('What is')) {
      const numbers = q.slice(8).split(' plus ');
      numbers[1] = numbers[1].slice(0,-1);
      myAnswer = parseInt(numbers[0]) + parseInt(numbers[1]);
    }

    if(q.includes('Add all these together for me:')) {
      myAnswer = q.slice(31).split(' ').reduce((a,c) => a += parseInt(c), 0);
    }

    const answerUrl = `https://random-questions-ijadnjmihb.now.sh/answer/ /${question.id}/${myAnswer}`;
    axios.get(answerUrl);
  }

  updateMap = () => {
    
  }


  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Plot Course</button>
      </div>
    );
  }
}

export default App;
