require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

module.exports = {
  // DefaultNetwork: "hardhat",
  solidity: "0.8.9",

  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    // Inract with local network
    localhost: {
      url: "http://localhost:8545",
      // accounts: hardhat will gives you a list of accounts in the local network,
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  // To get gas usage of each transaction import hardhat-gas-reporter
  //It will create table with gas usage of each transaction in the console if file is not specified
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColor: false,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: "MATIC", // Default is "ETH" but you can change it to any token you want for different network
  },
};
