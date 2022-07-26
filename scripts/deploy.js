const { ethers, run, network } = require("hardhat");

const main = async () => {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`SimpleStorage deployed to ${simpleStorage.address}`);

  // console.log(network.config); //To get all the information about the network

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    //chainId is 4 for Rinkeby
    await simpleStorage.deployTransaction.wait(6); // It will wait for 6 blocks to be mined after start verification
    await verify(simpleStorage.address, []);
  }

  /** Interaction with contract */
  const currentValue = await simpleStorage.retrieve();
  console.log("Current value:", currentValue);
  const transactionResponse = await simpleStorage.store(42);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log("New value:", updatedValue);
};

// we can't call it when we deploy contract on local network("hardhat")
// args parameter would be constructor of contract
const verify = async (contractAddress, args) => {
  console.log("verify");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgs: args,
    });
  } catch (error) {
    console.log(error);
  }
};

main()
  .then(() => {
    console.log("Deployed");
  })
  .catch((err) => {
    console.error(err);
  });
