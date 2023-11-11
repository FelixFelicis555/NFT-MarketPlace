/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core";
import CardContent from "@material-ui/core";
import Typography from "@material-ui/core";
import CardActionArea from "@material-ui/core";
import Grid from "@material-ui/core";
import Image from "next/image";
import ethericon from "../logo/Rectangle 7.svg";
import Button  from "@material-ui/core";
import { useRouter } from "next/router";

const ResellNFT=(props)=>{
    const lazyRoot=React.useRef(null);
    const router = useRouter();

    function listNFT(nft){
        console.log('nft:',nft);
        router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.img}&img=${nft.img}`)
    }

    return(
        <Grid item xs={12} sm={4} md={3} key={props.index}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Card sx={{ maxWidth: 1500, borderRadius: '15px' }}>
                <CardActionArea>
                    <Image lazyRoot={lazyRoot} src={props.img} width="800px" height="500px" />
                </CardActionArea>
            </Card>
            <Button onClick={() => listNFT(props)}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: 240, borderRadius: '15px', backgroundColor: '#90E0EF', marginTop: '4%' }}>

                    <Image lazyRoot={lazyRoot} src={ethericon} width="35" height="40" />

                    <Typography variant="subtitle1" >
                        {props.cost} &nbsp; Ethers
                    </Typography>

                </Box>
            </Button>
        </Box>
    </Grid >

    )
}

export default ResellNFT;