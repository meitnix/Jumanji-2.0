import useAuth from "../hooks/useAuth"
import { useState } from "react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";

const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

const DashFooter = () => {

    const { username, status } = useAuth()
  const { account, chainID, connect } = useMetaMask()  
  const [accountAddress, setAccountAddress] = useState("");
  const [accountChainID, setAccountChainID] = useState("");
  const [accountBal, setAccountBal] = useState("");

  const connectButtonOnClick = () => {
    
    if(connect()){
        setAccountAddress(account)
        setAccountChainID(chainID)
        console.log(accountChainID)}
    // console.log(window);
    // if (
    //   typeof window !== "undefined" &&
    //   typeof window.ethereum !== "undefined"
    // ) {
    //   getAccount().then((response) => {
    //     setAccountAddress(response);
    //   });
    // } else {
    //   console.log("error");
    // }
    getBalOnClick()
  };
  const getBalOnClick = async () => {
    let bprovider = new ethers.providers.EtherscanProvider(5,'NBXIU8MUSSCZJ3MECXENXC6GC9P956YH52');
    let address =accountAddress
    let bal=await provider.getBalance(address)
    let tranum=await provider.getTransactionCount(address)
    let chainId=(await provider.getNetwork()).chainId
    let history = await bprovider.getHistory(address)
    console.log(history)
    setAccountChainID(chainId)
    console.log(tranum)
    //console.log(ethers.utils.formatEther(bal))
    setAccountBal(ethers.utils.formatEther(bal))
    //console.log(address)
  }

    const content = (
        <footer className="dash-footer">
            <p className="dash-status">Current User: {username}</p>
            <p className="dash-status">Status: {status}</p>
            <button variant="contained" className="dash-footer__button footer__wallet" onClick={connectButtonOnClick}>
             {!!accountAddress ? "Wallet Address: "+accountAddress+'\t\tBal:'+accountBal: "Connect Wallet Button"}
             </button>
        </footer>
        
    )
    return content
}
export default DashFooter