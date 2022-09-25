import "bootswatch/dist/vapor/bootstrap.min.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GolBoard from "./components/GolBoard";
import Board from "./components/Board";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

      <Routes>
        <Route path = '/' element = {<App/>}></Route>
        <Route path = '/GameOfLife' element = {<GolBoard/>}/>
        <Route path = '/pathFinder' element = {<Board/>}/>


      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
