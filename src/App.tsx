import './App.css';
import { useQuery } from 'react-query'
import axios from 'axios';
import NavBar from './components/NavBar';


function App() {


const { data } = useQuery(["fact"], () => {
    console.log('query')
    return axios.get("https://random-data-api.com/api/v2/users").then((res)=> res.data)
    // return axios.get("https://asli-fun-fact-api.herokuapp.com/").then((res) => res.data);
  })


  

  return (
    <>
      <NavBar />
      <h1>id: {data?.id}</h1>
      <h1>First Name: {data?.first_name}</h1>
      <h1>Last Name: {data?.last_name}</h1>
    </>
  );
}

export default App;
