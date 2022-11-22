import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store";

const Header = () => {
  const dispath=useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [value, setvalue] = useState();
  return (
    <AppBar 
    position="sticky"
    sx={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,72,1) 35%, rgba(111,119,124,1) 75%, rgba(0,212,255,1) 100%)"}}>
        <Toolbar >
            Blogggg
        { isLoggedIn && <Box>
          <Tabs textColor="inherit" value={value} onChange={(e,val)=>setvalue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label="ALL BLOGS"/>
            <Tab LinkComponent={Link} to="/myblogs"label="MY BLOGS"/>
            <Tab LinkComponent={Link} to="/blogs/add"label="ADD BLOG"/>
          </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
            { !isLoggedIn && <Button LinkComponent={Link} to="/auth"
            variant="contained" color="warning"> LOGIN </Button> }
            {!isLoggedIn && <Button LinkComponent={Link} to="/auth"
            variant="contained" color="warning"> SIGN UP </Button>}            
            { isLoggedIn && <Button LinkComponent={Link} to="/auth"
            variant="contained" color="warning"
            onClick={()=>dispath(authAction.logout())}
            > LOG OUT </Button> }
        </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header