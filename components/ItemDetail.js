/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core";
import Typography from "@material-ui/core";
import CardActionArea from "@material-ui/core";
import Grid from "@material-ui/core";
import ethericon from "../logo/Rectangle 7.svg";
import Image from 'next/image';
import Button from "@material-ui/core";
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useRouter } from "next/router";

import{
    marketplaceAddress
} from '../config';

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

async function buyNft(nft){
    const web3Modal = new Web3Modal();
    const connection=await web3Modal.connect();
    const provider=new ethers.providers.Web3Provider(connection)
    const signer=provider.getSigner();
    const contract=new ethers.Contract(marketplaceAddress,NFTMarketplace.abi,signer);

    console.log(nft);
    const price=ethers.utils.parseUnits(nft.cost.toString(),'ether')
    const transaction=await contract.createMarketSale(nft.tokenId,{
        value: price
    })
    await transaction.wait();
}

const ItemDetails=(props)=>{
    const lazyRoot=React.useRef(null);
    const router=useRouter();
    return(
<Grid item xs={12} sm={4} md={3} key={props.index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Card sx={{ maxWidth: 1500, borderRadius: '15px' }}>
                    <CardActionArea>
                        <Image lazyRoot={lazyRoot} src={props.img} width="800px" height="500px" />
                    </CardActionArea>
                </Card>
                <Button onClick={(e) => buyNft(props)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: 240, borderRadius: '15px', backgroundColor: '#90E0EF', marginTop: '4%' }}>

                        <Image lazyRoot={lazyRoot} src={ethericon} width="35" height="40" />

                        <Typography variant="subtitle1" >
                            {props.cost} &nbsp; Ethers
                        </Typography>

                    </Box>
                </Button>
            </Box>
            </Grid>

    )
}

export default ItemDetails;