import { network } from "hardhat";

const { viem } = await network.create({
  network: "localhost",
});

const voting = await viem.getContractAt(
  "SimpleVoting",
  "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
);

const count0 = await voting.read.voteCounts([0n]);
const count1 = await voting.read.voteCounts([1n]);

console.log("Candidate 0:", count0.toString());
console.log("Candidate 1:", count1.toString());