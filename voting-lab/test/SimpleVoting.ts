import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";

describe("SimpleVoting", async function () {
  const { viem } = await network.create();
  const publicClient = await viem.getPublicClient();

  it("First vote increases candidate 0 count", async function () {
    const voting = await viem.deployContract("SimpleVoting");

    assert.equal(await voting.read.voteCounts([0n]), 0n);

    const hash = await voting.write.vote([0n]);
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    assert.equal(receipt.status, "success");
    assert.equal(await voting.read.voteCounts([0n]), 1n);
  });

  it("Rejects a second vote from the same account", async function () {
  const voting = await viem.deployContract("SimpleVoting");

  const hash = await voting.write.vote([0n]);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });
  assert.equal(receipt.status, "success");

  await assert.rejects(
    async () => {
      await voting.write.vote([1n]);
    },
    /Already voted/,
  );

  assert.equal(await voting.read.voteCounts([0n]), 1n);
  assert.equal(await voting.read.voteCounts([1n]), 0n);
});
it("Rejects an invalid candidate", async function () {
  const voting = await viem.deployContract("SimpleVoting");

  await assert.rejects(
    async () => {
      await voting.write.vote([2n]);
    },
    /Invalid candidate/,
  );

  assert.equal(await voting.read.voteCounts([0n]), 0n);
  assert.equal(await voting.read.voteCounts([1n]), 0n);
});

it("Records that an account has voted", async function () {
  const voting = await viem.deployContract("SimpleVoting");
  const [voter] = await viem.getWalletClients();

  assert.equal(
    await voting.read.hasVoted([voter.account.address]),
    false,
  );

  const hash = await voting.write.vote([0n]);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });
  assert.equal(receipt.status, "success");

  assert.equal(
    await voting.read.hasVoted([voter.account.address]),
    true,
  );
});
});
