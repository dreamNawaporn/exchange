"use client";
import React, { useState, useEffect } from "react";

import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';



const [metaMask, hooks] = initializeConnector(
  actions => new MetaMask({ actions })
);
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;
const contractChain = 11155111;

const contractAddress = "0xc50BACf145055052B3eEF866C5924380D5C9a321";

export default function Page() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActive = useIsActive();

  const provider = useProvider();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect  to metamask");
    });
  }, []);

  const handleConnect = () => {
    metaMask.activate(contractChain);
  };

  const handleDisconnect = () => {
    metaMask.resetState();
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isActive ? (
             <Stack direction="row" spacing={1}>
             <Chip label={ accounts[0]}/>
            
            <Button color="inherit" onClick={handleDisconnect}>Disconnect</Button>
            </Stack>
            ) : (
              <Button color="inherit" onClick={handleConnect}>Connect</Button>
          )}
         
        </Toolbar>
      </AppBar>
    </Box>
      <p>chainId: {chainId}</p>
      <p>isActive: {isActive.toString()}</p>
      <p>accounts: {accounts ? accounts[0] : ""}</p>
      

      {isActive ? (
        <input type="button" onClick={handleDisconnect} value={"Disconnect"} />
      ) : (
        <input type="button" onClick={handleConnect} value={"Connect"} />
      )}
    </div>
  );
}
// w3school - React Ternary operator https://www.w3schools.com/react/react_es6_ternary.asp


