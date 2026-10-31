import { network } from "hardhat";

const { viem } = await network.create({
  network: "localhost",
});

const counter = await viem.getContractAt(
  "Counter",
  "0x5fbdb2315678afecb367f032d93f642f64180aa3",
);

const publicClient = await viem.getPublicClient();

console.log("Before:", (await counter.read.x()).toString());

const hash = await counter.write.inc();
console.log("Transaction hash:", hash);

const receipt = await publicClient.waitForTransactionReceipt({
  hash,
});

console.log("Status:", receipt.status);
console.log("After:", (await counter.read.x()).toString());