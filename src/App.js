import { useState, useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [num,setNum] = useState(1);
  useEffect(() => {
    const loadProvider = async () => {
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url = "http://localhost:8545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );
      setContract(contract);
      setProvider(provider);
      // console.log(contract);
    };
    loadProvider();
  }, []);
  useEffect(() => {
    const getGreetings = async () => {
      const greeting = await contract.greet();
      doGreeting(greeting);
    };
    contract && getGreetings();
  }, [contract]);

  
  useEffect(() => {
    setNum(JSON.parse(window.localStorage.getItem('num')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('num', num);
  }, [num]);
  
  
  
  const changeGreetings = async () => {
    const input = document.querySelector("#value");
    const signer = contract.connect(provider.getSigner());
    signer.setGreeting(input.value);
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
    setTimeout();
  };
  
    const incNum = () =>{
    setNum(num+1);
  
  }
  
  return (
    <div className="center">
    <h3>{num}</h3>
      <h3>{greeting}</h3>
      <input className="input" type="text" id="value"></input>
       <button className="button" onClick={() =>{
       changeGreetings();
       incNum();
      }} >
        Change
      </button>
    </div>
  );
}

export default App;


