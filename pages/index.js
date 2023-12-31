import { Box } from "@material-ui/core";
import Header from '../components/header.js';
import Collections from "../components/Collections.js";
import Info from "../components/Info";
import Design from "../components/design.js";

import { ethers } from "ethers";
import { useEffect,useState } from "react";
import Web3Modal from 'web3modal'

import{
    marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function Index() {
    const [nfts,setNfts]=useState([])
    const [loadingState,setLoadingState]=useState('not-loaded')

    useEffect(()=>{
        loadNFTs()
    },[])

    async function loadNFTs() {
        const provider=new ethers.providers.JsonRpcProvider()
        const contract=new ethers.Contract(marketplaceAddress,NFTMarketplace.abi,provider)
        const data=await contract.fetchhMarketItems()

        /*
          ! map over items returned from smart contract and format them as well as fetch their token metadata

        */
       const items=await Promise.all(data.map(async i=>{

         const tokenUri=await contract.tokenUri(i.tokenId)
         const searchParams=new URLSearchParams()
         searchParams.set('fileUrl',tokenUri)
         const meta=await fetch('`/api/data?${searchParams.toString()}').then(r=>r.json())
         let price=ethers.utils.formatUnits(i.price.toString(),'ether')

         let item={
            price,
            tokenId:i.tokenId.toNumber(),
            seller:i.seller,
            owner:i.owner,
            image:tokenUri,
            name:meta["name"],
            description:meta["description"],
         }
         return item;
       }))
       console.log(items)
       setNfts(items)
       setLoadingState('loaded')
    }

    return (
        <Box>
      <Box sx={{ backgroundColor: '#F7FFFE', margin: '-0.4%' }}>
        <Box
          sx={{
            backgroundColor: '#F7FFFE',
            margin: '-0.4%',
            marginRight: '-0.1%',
            marginBottom: '-2%',
          }}
        >
          <Header page={1} />
          {nfts.length != 0 && (
            <Collections title="NFT Collections" nfts={nfts} />
          )}
          {!nfts.length && <center><h1>No Items present</h1></center>}
          <Info title="random" />
          <Design />
        </Box>
      </Box>
    </Box>
    )
}