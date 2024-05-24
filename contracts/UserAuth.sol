// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAuth {
    uint public userCount;

    struct User {
        string name;
        string privilege;
        string authority;
    }

    event UserRegistered(
        address indexed walletId,
        string name,
        string privilege,
        string authority
    );

    mapping(address => User) public Users;

    // Check if user exists based on their privilege
    function checkUserExists(address _userAddress) public view returns (bool) {
        bytes32 privilegeHash = keccak256(abi.encodePacked(Users[_userAddress].privilege));
        return
            privilegeHash == keccak256("government") ||
            privilegeHash == keccak256("industry") ||
            privilegeHash == keccak256("individual");
    }

    // Register a new user
    function setUser(
        address _walletId,
        string memory _name,
        string memory _privilege,
        string memory _authority
    ) public {
        // Input validation
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_privilege).length > 0, "Privilege is required");
        require(bytes(_authority).length > 0, "Authority is required");
        require(!checkUserExists(_walletId), "User already exists");

        // Set user details
        Users[_walletId] = User(_name, _privilege, _authority);
        userCount += 1;

        // Emit UserRegistered event
        emit UserRegistered(_walletId, _name, _privilege, _authority);
    }
}
