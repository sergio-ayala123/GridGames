import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useQuery } from 'react-query'
import { Button } from '@mui/material';
import axios from 'axios';
import NavBar from './components/NavBar';
import GolBoard from './components/GolBoard';
import { Route } from 'react-router-dom';
import ReactDom from 'react-dom'

function App() {

const [value, setValue] = useState<string>('');

const { data } = useQuery(["fact"], () => {
    console.log('query')
    return axios.get("https://x-math.herokuapp.com/api/random").then((res)=> res.data)
    // return axios.get("https://asli-fun-fact-api.herokuapp.com/").then((res) => res.data);
  })


  

  return (
    <>
      <NavBar />
      <h1>{data?.expression} =  {data?.answer}</h1>
    </>
  );
}

export default App;
