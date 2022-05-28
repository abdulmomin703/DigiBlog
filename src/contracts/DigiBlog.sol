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
  
    struct Blog {
        uint256 id;
        address blogger_address;
        string title;
        string body;
        string image;
        uint256 date;
    }

    mapping(address => bool) public users;

    mapping(address => User) public user_info;

    constructor () {
       contract_name = "DigiBlog";
    }

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

    uint256 blogId = 0;

    mapping(uint256 => bool) blog_exist;

    mapping(uint256 => Blog) id_to_blog;

    mapping(address => uint256[]) user_to_blog;

    function createBlog(address user, string memory title, string memory body, string memory image) external {
        require(user != address(0), 'Error - Invalid Wallet Address');
        require(users[user], 'Error - User Does not exists');

        blogId += 1;

        Blog memory newBlog = Blog(blogId, user, title, body, image, block.timestamp);

        user_to_blog[address(0)].push(blogId);

        id_to_blog[blogId] = newBlog;

        user_to_blog[user].push(blogId);

        blog_exist[blogId] = true;

        user_info[user].no_blogs += 1;

    }
    function remove(uint _valueToFindAndRemove, uint[] storage _array)  internal {
        uint256 index = 0;
        for (uint i = 0; i < _array.length; i++){
            if(_array[i] == _valueToFindAndRemove)
                index = i;
        }

        _array[index] = _array[_array.length-1];
        _array.pop();
    }

    function deleteBlog(uint256 id) external {
        address owner = id_to_blog[id].blogger_address; 
        remove(id, user_to_blog[address(0)]);
        remove(id, user_to_blog[owner]);
        user_info[owner].no_blogs -= 1;
    }

    function getBlogInfo (uint256 id) external view returns (Blog memory) {
        
        require(blog_exist[id] , 'Error - Blog Does not exists');

        return id_to_blog[id];
    }

    function getAllBlogs() view external returns(uint[] memory) {
        return user_to_blog[address(0)];
    }

     function getUserBlogs() view external returns(uint[] memory) {
        require(users[msg.sender], 'Error - User Does not exists');
        return user_to_blog[msg.sender];
    }

      function editBlog (uint256 id, address user, string memory title, string memory body, string memory image) external {
        require(users[user], 'Error - User Does not exists');
        require(blog_exist[id], 'Error - Blog Does not exists');
        require(id_to_blog[id].blogger_address == user, 'Error - Only the owner can edit Blog');
        id_to_blog[id].title = title;
        id_to_blog[id].body = body;
        id_to_blog[id].image = image;
    }
}
