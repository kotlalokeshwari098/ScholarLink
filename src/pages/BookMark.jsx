import React from 'react'
import {Stack,IconButton,Typography,Box} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function BookMark() {
  return (
    <>
       <Stack direction='row' alignItems="center">
          <IconButton sx={{color:'black' , mr:1}}>
                   <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6'>
            Bookmarks
          </Typography>
       </Stack>
       <div>
        
       </div>
    </>
  )
}

export default BookMark

