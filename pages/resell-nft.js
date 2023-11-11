import { Box } from "@mui/material/Box";
import Header from "../components/header";
import FormResells from '../components/formResell';

const ResellPage=()=>{
    return(
<Box>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          margin: '-0.4%',
          marginRight: '-0.3%',
        }}
      >
        <Header page={2} />
        <FormResells />
      </Box>
    </Box>
    )
}

export default ResellPage;
