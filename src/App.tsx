import React, { useState } from 'react';
import './App.css';
import { useQuery } from 'react-query'
import axios from 'axios';
import NavBar from './components/NavBar';
import GolBoard from './components/GolBoard';


function App() {


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
