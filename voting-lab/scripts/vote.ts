import { network } from "hardhat";

const { viem } = await network.create({
  network: "localhost",
});

const voting = await viem.getContractAt(
  "SimpleVoting",
  "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
);

const publicClient = await viem.getPublicClient();
const [voter] = await viem.getWalletClients();

console.log("Voter:", voter.account.address);

const hash = await voting.write.vote([0n]);
console.log("Transaction hash:", hash);

const receipt = await publicClient.waitForTransactionReceipt({
  hash,
});

console.log("Status:", receipt.status);
console.log(
  "Candidate 0:",
  (await voting.read.voteCounts([0n])).toString(),
);
console.log(
  "Has voted:",
  await voting.read.hasVoted([voter.account.address]),
);