/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Box } from "@material-ui/core";
import Image from "next/image";
import designImage from '../logo/Group 5.svg';

const Design =()=>{
    return(
        <Box sx={{ margin: '-0.3%', marginBottom: '-1%' }}>
            <Image src={designImage} width='1600' height='683'></Image>
        </Box>
    )
}

export default Design;