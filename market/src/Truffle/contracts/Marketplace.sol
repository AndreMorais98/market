// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import './LuxyToken.sol';

contract Marketplace {

  constructor() {

  }

  mapping(uint256 => address) private _owners;
  mapping(address => uint256) private _balances;
  mapping(uint256 => address) private _approvedTokens;
  mapping(address => mapping(address => bool)) _approvedOperators;
  mapping(address => uint256) UserBalances;
  mapping(address => mapping(uint256 => nft)) public nfts; // stores details of nft on auction


  struct nft {
    bool firstSale;
    address seller;
    address buyer;
    bool isOnSale;
  }

  event OnSale (
      uint256 indexed tokenId
  );

  event Buy (
      uint256 indexed tokenId
  );

  event FinishSale (
      uint256 indexed tokenId
  );

  event RemoveBuy (
      uint256 indexed tokenId
  );
0
  modifier isCreatorAndApproved(address nftAddress, uint256 tokenId, address middleman) {
      LuxyToken luxy = LuxyToken(nftAddress);
      address creator = luxy.creator();
      require (middleman == creator);
      require (luxy.getApproved(tokenId) != middleman);
      _;
    }

  function putOnSale(address nftAddress, uint256 tokenId, uint256 price) public isCreatorAndApproved(nftAddress, tokenId, msg.sender) {
    require(nfts[nftAddress][tokenId].isOnSale == false, 'Already on sale');
    nfts[nftAddress][tokenId].seller = msg.sender;
    nfts[nftAddress][tokenId].isOnSale = true;
    emit OnSale(tokenId);
  }

  function buy(address nftAddress, uint256 tokenId) public {
    nfts[nftAddress][tokenId].buyer = msg.sender;
    nfts[nftAddress][tokenId].isOnSale = false;
    emit Buy(tokenId);
  }
  
  function finishSale(address nftAddress, uint256 tokenId) public {
    nfts[nftAddress][tokenId].seller = address(0);
    nfts[nftAddress][tokenId].isOnSale = false;
    IERC721 luxy = IERC721(nftAddress);
    luxy.transferFrom(msg.sender, nfts[nftAddress][tokenId].buyer, tokenId);
    emit FinishSale(tokenId);
  }

  function removeCancel(address nftAddress, uint256 tokenId) public {
    nfts[nftAddress][tokenId].buyer = address(0);
    nfts[nftAddress][tokenId].isOnSale = true;
    emit RemoveBuy(tokenId);
  }
}