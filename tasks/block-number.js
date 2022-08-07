const { tast, task } = require("hardhat/config");

task("block-number", "Get the current block number").setAction(
  async (taskArgs, hre) => {
    // hre is the instance of HardhatRuntimeEnvironment
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log("Current Block number:", blockNumber);
  }
);
