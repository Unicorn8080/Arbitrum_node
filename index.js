const express = require('express');
const axios = require('axios');
const ethers = require('ethers');

const app = express();
const port = 3000;

const provider = new ethers.JsonRpcProvider('https://arbitrum-sepolia.infura.io/v3/32cb9492247446599a7bfba82cd24a2b');

// Define routes
app.get('/getData', async (req, res) => {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log('Block Number:', blockNumber);

        // Make HTTP request to blockchain infrastructure API using Axios
        const response = await axios.post('https://arbitrum-mainnet.infura.io/v3/32cb9492247446599a7bfba82cd24a2b', {
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: ['0xc94770007dda54cF92009BFF0dE90c06F603a09f', 'latest'],
            id: 1
        });

        // Log response data
        console.log('Response:', response.data);

        // Send response back to client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching blockchain data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});