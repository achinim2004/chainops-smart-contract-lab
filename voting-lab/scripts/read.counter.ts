import { network } from "hardhat";

const { viem } = await network.create({
  network: "localhost",
});

const counter = await viem.getContractAt(
  "Counter",
  "0x5fbdb2315678afecb367f032d93f642f64180aa3",
);

const value = await counter.read.x();

console.log("Counter x =", value.toString());