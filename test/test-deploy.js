const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
  let simpleStorage, simpleStorageFactory;
  beforeEach(async () => {
    // Get the contract instance
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  /**
   * If want to run perticular test, we can use it like this:
   * if.only("Should update when we call store", async () => {  })
   */

  it("Should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = 0; // If we change the value of the contract, this test will fail

    // expect(currentValue.toString()).to.equal(expectedValue); // assert and expect are equivalent
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async () => {
    const newValue = 42;
    await simpleStorage.store(newValue);
    const currentValue = await simpleStorage.retrieve();
    // console.log("Current value:", currentValue);
    assert.equal(currentValue.toString(), newValue);
  });
});
