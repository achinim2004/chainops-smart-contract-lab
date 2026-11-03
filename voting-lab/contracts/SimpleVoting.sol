// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract SimpleVoting {
    uint256[2] public voteCounts;
    mapping(address => bool) public hasVoted;
    event VoteCast(address indexed voter, uint256 indexed candidateId);

function vote(uint256 candidateId) external {
    require(candidateId < 2, "Invalid candidate");
    require(!hasVoted[msg.sender], "Already voted");

    hasVoted[msg.sender] = true;
voteCounts[candidateId] += 1;

emit VoteCast(msg.sender, candidateId);
    
}


}

