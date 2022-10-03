// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract Marketplace is IERC721, ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;
  string private _name; 
  string private _symbol;

  constructor() {
    // owner = payable(msg.sender);  
  }

  mapping(uint256 => address) private _owner;
  mapping(address => uint256) private _balance;


  struct NftProduct {
    uint256 id;
    uint256 tokenId;
    address payable owner;
    address creator;
    uint256 price;
    bool sold;
    address nft_contract;
  }

  struct MarketItem{
    uint256 id;
    address tokenAddress;
    uint256 tokenId;
    address payable seller;
    uint256 royalty;
    uint256 price;
    bool sold;
  }

  MarketItem[] public items;

  // ----------- Events-----------

  event ItemIsOnSale(
    uint256 indexed nftId,
    address indexed nftContractAddress,
    address creator,
    uint256 price,
    address seller
  );

  event ItemsSold(
    uint256 indexed nftId,
    address indexed nftContractAddress,
    uint256 price,
    address buyer
  );

  event Buy(
    uint256 indexed transactionId,
    address indexed bidder,
    uint256 indexed nftId,
    uint256 price
  );

  event Approval(
    address indexed owner, 
    address indexed approved, 
    uint256 indexed tokenId
  );

  /**
  Get token contract name
   */
  function name() public view returns (string memory) {
    return _name;
  }

  /**
  Get token contract symbol
   */
  function symbol() public view returns (string memory) {
    return _symbol;
  }

  /**
  checks if a token already exist
  @param tokenId - token id
   */
  function _exists(uint256 tokenId) internal view returns (bool) {
    return _owners[tokenId] != address(0);
  }

  /**
  Internal function to check if msg.sender is either owner or approved
  @param sender - address
  @param tokenId - token id
   */
  function isOwnerOrApproved (address sender, uint256 tokenId) internal view returns (bool) {
    require(_owners[tokenId] != address(0), 'no token exists');
    return (sender == _owners[tokenId] || sender == _approvedTokens[tokenId]);
  }

  /**
  Internal function to approve a token `tokenId` to `to`
  @param to - to address
  @param tokenId - token id
   */
  function _approve(address to, uint256 tokenId) internal {
    _approvedTokens[tokenId] = to;
    emit Approval(_owners[tokenId], to, tokenId);
  }

  /**
  IERC721 specification
   */
  function approve(address approved, uint256 tokenId) public override { 
    address owner = _owners[tokenId];
    require(msg.sender == _owners[tokenId] || isApprovedForAll(owner, msg.sender), 'caller not an owner or not approved all');
    _approve(approved, tokenId);
  }

  /**
  IERC721 specification
   */
  function getApproved(uint256 tokenId) public view override returns (address) {
    require(_owners[tokenId] != address(0), 'no token exists');
    return _approvedTokens[tokenId];
  }

  /**
  IERC721 specification
   */
  function setApprovalForAll(address operator, bool approved) public override {
    require(operator != msg.sender, "approve to caller");
    _approvedOperators[msg.sender][operator] = approved;
    emit ApprovalForAll(msg.sender, operator, approved);
  }

  /**
  IERC721 specification
   */
  function isApprovedForAll(address owner, address operator) public view override returns (bool) {
    return _approvedOperators[owner][operator];
  }

  /**
  IERC721 specification
   */
  function balanceOf(address owner) public view override returns (uint256) {
    require(owner != address(0));
    return _balances[owner];
  }

  /**
  IERC721 specification
   */
  function ownerOf(uint256 tokenId) public view override returns (address) {
    require(_owners[tokenId] != address(0), 'no token exists');
    return _owners[tokenId];
  }

  /**
  Internal function to transfer a token from `from` to `to`
  @param from - from address
  @param to - to address
  @param tokenId - token id
   */
  function _transfer(address from, address to, uint256 tokenId) internal {
    require(to != address(0), 'transfering to zero addres');
    _owners[tokenId] = to;
    _balances[to] += 1;
    _balances[from] -= 1;

    emit Transfer(from, to, tokenId);
  }

  /**
  IERC721 specification
   */
  function safeTransferFrom(address from, address to, uint256 tokenId) public override {
    safeTransferFrom(from, to, tokenId, "");
  }

  /**
  IERC721 specification
   */
  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
    require(isOwnerOrApproved(msg.sender, tokenId), 'caller not an owner or approved');
    _transfer(from, to, tokenId);
    require(_checkOnERC721Received(from, to, tokenId, data), "receiver has not implemented ERC721Receiver");
  }

  /**
  Transfer a token from `from` to `to`
  @param from - from address
  @param to - to address
  @param tokenId - token id
   */
  function transferFrom(address from, address to, uint256 tokenId) public override {
    require(isOwnerOrApproved(msg.sender, tokenId), 'caller not an owner or approved');
    _transfer(from, to, tokenId);
  }

  /**
  Bid for a token on sale. Bid amount has to be higher than current bid or minimum price.
  Accepts ether as the function is payable
  @param tokenId - token id 
   */
  function bid(uint256 tokenId) public payable {
    require(_owners[tokenId] != msg.sender, 'owner cannot bid');
    require(nfts[tokenId].isOnSale == true, 'Not on sale');
    require(nfts[tokenId].endTime > block.timestamp, 'Sale ended');
    if (nfts[tokenId].bid == 0) {
      require(msg.value > nfts[tokenId].minPrice, 'value sent is lower than min price');
    } else {
      require(msg.value > nfts[tokenId].bid, 'value sent is lower than current bid');
      UserBalances[nfts[tokenId].bidder] = addNumer(UserBalances[nfts[tokenId].bidder], nfts[tokenId].bid);
    }
    nfts[tokenId].bidder = payable(msg.sender);
    nfts[tokenId].bid = msg.value;
    emit Bid(tokenId, nfts[tokenId].bidder, msg.value);
  }

  /**
  Claim a token after end of sale
  @param tokenId - token id 
   */
  function claim(uint256 tokenId) public {
    require(msg.sender == nfts[tokenId].bidder, 'Not latest bidder');
    require(nfts[tokenId].endTime < block.timestamp, 'Cannot claim before sale end time');
    require(nfts[tokenId].isOnSale == true, 'Not on sale');
    UserBalances[nfts[tokenId].seller] = addNumer(UserBalances[nfts[tokenId].seller], nfts[tokenId].bid);
    nfts[tokenId].isOnSale = false;
    _transfer(nfts[tokenId].seller, nfts[tokenId].bidder, tokenId);
    emit SaleEnded(tokenId, nfts[tokenId].bidder, nfts[tokenId].bid);
  }

  function withDrawEther() public {
    uint256 balance = UserBalances[msg.sender];
    require(balance > 0, 'not enough money to withdraw');
    payable(msg.sender).transfer(balance);
  }

  function getUserEtherBalance() public view returns (uint256) {
    return UserBalances[msg.sender];
  }
  
  /**
  Get status of a token
  @param tokenId - token id 
   */
  function getNFTBidStatus(uint256 tokenId) public view returns (bool, address) {
    return (nfts[tokenId].isOnSale, nfts[tokenId].bidder);
  }

  /**
  Add two uint
  @param a - number
  @param b - number
   */
  function addNumer(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      require(c >= a, "SafeMath: addition overflow");

      return c;
  }

  /**
  Checks if the tartget is a contract and has implemented onERC721Received
   */
  function _checkOnERC721Received(
    address from,
    address to,
    uint256 tokenId,
    bytes memory _data
  ) private returns (bool) {
      if (isContract(to)) {
          try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data) returns (bytes4 retval) {
              return retval == IERC721Receiver.onERC721Received.selector;
          } catch (bytes memory reason) {
              if (reason.length == 0) {
                  revert("receiver has not implemented ERC721Receiver");
              } else {
                  assembly {
                      revert(add(32, reason), mload(reason))
                  }
              }
          }
      } else {
          return true;
      }
  }

  function isContract(address account) internal view returns (bool) {
    // This method relies on extcodesize, which returns 0 for contracts in
    // construction, since the code is only stored at the end of the
    // constructor execution.

    uint256 size;
    assembly {
        size := extcodesize(account)
    }
    return size > 0;
  }
}


// Transfer com o creator do NFT a ser o único a poder por o item à venda
// Owner entrega na loja e passa NFT para o creator (Não precisa dos approvals)
// Dar royalties ao creator (1%) uint royalty = (items[id].royalty * items[id].price)/100;



// SM para o user??