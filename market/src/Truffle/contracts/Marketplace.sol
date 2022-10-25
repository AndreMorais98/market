// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './LuxyToken.sol';

contract Marketplace is Ownable {
  uint256 public LISTING_FEE = 0.0001 ether;

  mapping(address => mapping(uint256 => Nft)) public nfts; // stores details of nft on auction

  // ----------- Structs -----------

  struct Nft {
    address owner;
    address creator;
    address[] buyersList;
    bool firstSale;
    bool isOnSale;
  }

  Nft[] nftsListed;

  // ----------- Events-----------

  event OnSale (
    uint256 indexed tokenId,
    address indexed nftAddress,
    address seller
  );

  event Reserve (
    uint256 indexed tokenId,
    address indexed nftAddress,
    address reserver
  );

  event FinishTransfer (
    uint256 indexed tokenId,
    address indexed nftAddress,
    address buyer
  );

  modifier isCreator(address nftAddress, uint256 tokenId, address wallet) {
    LuxyToken luxy = LuxyToken(nftAddress);
    address creator = luxy.creator();
    require (wallet == creator);
    _;
  }

  modifier isApproved(address nftAddress, uint256 tokenId, address owner) {
    LuxyToken luxy = LuxyToken(nftAddress);
    address creator = luxy.creator();
    require (owner != creator);
    require (luxy.getApproved(tokenId) == creator);
    _;
  }

  function putOnSale(address nftAddress, uint256 tokenId, address creator, uint256 _price) public payable {
    require(_price > 0, "Price must be at least 1 wei");
    require(msg.value == LISTING_FEE, "Not enough ether for listing fee");
    require(nfts[nftAddress][tokenId].isOnSale == false, 'Already on sale');
    nfts[nftAddress][tokenId].owner = msg.sender;
    nfts[nftAddress][tokenId].creator = creator;
    nfts[nftAddress][tokenId].isOnSale = true;
    nfts[nftAddress][tokenId].buyersList = [];
    nftsListed[nfts[nftAddress][tokenId]].push;
    approve(nftAddress, tokenId, creator);
    emit OnSale(nftAddress, tokenId, msg.sender);
  }


  function firstTransfer(address nftAddress, uint256 tokenId, address buyer) public isCreator(nftAddress, tokenId, msg.sender) {
    require(nfts[nftAddress][tokenId].firstSale == true, 'This is not the first transfer');
    if (nfts[nftAddress][tokenId].creator == nfts[nftAddress][tokenId].owner){
      nfts[nftAddress][tokenId].owner = buyer;
      nfts[nftAddress][tokenId].isOnSale = false;
      IERC721 luxy = IERC721(nftAddress);
      luxy.transferFrom(nfts[nftAddress][tokenId].owner, buyer, tokenId);

    }
    emit FinishTransfer(nftAddress, tokenId, buyer);
  }

  function reserve(address nftAddress, uint256 tokenId) public {
    require(nfts[nftAddress][tokenId].isOnSale == true, 'This NFT is not on sale');
    nfts[nftAddress][tokenId].buyersList.push(msg.sender);
    emit Reserve(nftAddress, tokenId, msg.sender);
  }

  function isOnBuyersList(address nftAddress, uint256 tokenId, address buyer) public {
    list = nfts[nftAddress][tokenId].buyersList;
    for (uint i=0; i < list.length; i++) {
      if (buyer == list[i]) {
        return true;
      }
    }
    return false;
  }

  function removeFromBuyersList(address nftAddress, uint256 tokenId) public isApproved(nftAddress, tokenId, msg.sender) {
    require(nfts[nftAddress][tokenId].buyersList[] == [], 'There is no buyers');
    nfts[nftAddress][tokenId].buyersList[0].pop();
  }
  
  function finishTransfer(address nftAddress, uint256 tokenId, address buyer) public isApproved(nftAddress, tokenId, msg.sender) {
    require(isOnBuyersList(nfts[nftAddress][tokenId].buyersList[0] == buyer, 'This address is not the buyer'));
    require(nfts[nftAddress][tokenId].isOnSale == true, 'This NFT is not on sale');
    IERC721 luxy = IERC721(nftAddress);
    luxy.transferFrom(msg.sender, nfts[nftAddress][tokenId].buyersList[0], tokenId);
    nfts[nftAddress][tokenId].isOnSale = false;
    nfts[nftAddress][tokenId].buyersList = [];
    emit FinishTransfer(nftAddress, tokenId, buyer);
  }
  
  function getListingFee() public view returns (uint256) {
    return LISTING_FEE;
  }

  function checkIsOnSale(address nftAddress, uint256 tokenId) public view returns (bool) {
    if (nfts[nftAddress][tokenId].isOnSale == true) {
      return true;
    }
    return false;
  }

  function getAllNftOnSale() public view {
    return nftsListed;
  }

}