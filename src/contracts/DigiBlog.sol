// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract DigiBlog{

    string public contract_name;

    struct User {
        string firstname;
        string lastname;
        string username;
        string avatar;
        uint256 no_blogs;
        string bio;
    }
    //array to store our nfts
    // string [] public books;

    // Will be used for login
    mapping(address => bool) public users;

    // Get user info based on address
    mapping(address => User) public user_info;

    function login() view external returns (bool) {
        return users[msg.sender];
    } 

    function signUp (address user_address, string memory firstname, string memory lastname, string memory username) external {
        require(user_address != address(0), 'Error - Invalid Wallet Address');
        require(!users[user_address], 'Error - User already exists');

        users[user_address] = true;

        User memory new_user = User(firstname, lastname, username, "", 0,"");

        user_info[user_address] = new_user;
    }

    function getUserInfo () external view returns (User memory) {
        require(users[msg.sender], 'Error - User Does not exists');

        return user_info[msg.sender];
    }
    
    function editProfile (string memory firstname, string memory lastname, string memory bio, string memory avatar) external {
        require(users[msg.sender], 'Error - User Does not exists');

        user_info[msg.sender].firstname = firstname;
        user_info[msg.sender].lastname = lastname;
        user_info[msg.sender].bio = bio;
        user_info[msg.sender].avatar = avatar;
    }

    constructor () {
       contract_name = "DigiBlog";
    }

}
