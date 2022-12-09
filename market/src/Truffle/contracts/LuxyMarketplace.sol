pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LuxyMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    address payable marketAddress;
    // 1000€ -> 0.01 matic = 0.000007274 ether = 0.088€
    // 1 matic = 0.000727 ether = 0.88€
    uint256 feePrice = 0.00001 ether;

    struct ListedToken {
        uint256 tokenId;
        uint256 price;
        uint256 holders;
        address payable owner;
        address payable seller;
        address last_owner;
        address [] buyers;
        bool currentlyListed;
        bool isOnStore;
    }

    event TokenListedSuccess (
        uint256 indexed tokenId,
        uint256 price,
        uint256 holders,
        address owner,
        address seller,
        address last_owner,
        bool currentlyListed,
        bool isOnStore
    );

    event TokenSold (
        uint256 indexed tokenId,
        address seller,
        address buyer
    );

    event TokenTransferedStore (
        uint256 indexed tokenId,
        uint256 price,
        address seller,
        address owner
    );

    mapping(uint256 => ListedToken) private idToListedToken;

    constructor() ERC721("LuxyMarketplace", "LUXYMP") {
        marketAddress = payable(msg.sender);
    }

    function getFeePrice() public view returns (uint256) {
        return feePrice;
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function createToken(string memory _uri, uint256 price) public payable returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _uri);
        createListedToken(newTokenId, price);
        return newTokenId;
    }

    function createListedToken(uint256 tokenId, uint256 price) private {
        require(msg.value == feePrice, "Not the correct price");

        idToListedToken[tokenId] = ListedToken(
            tokenId,
            price,
            0,
            payable(msg.sender),
            payable(msg.sender),
            msg.sender,
            new address[](0),
            true,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
        setApprovalForAll(address(this), true);
        emit TokenListedSuccess(
            tokenId,
            price,
            0,
            msg.sender,
            msg.sender,
            msg.sender,
            true,
            true
        );
    }

    function isOnStore(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].owner, "You are not the creator of this NFT");
        idToListedToken[tokenId].isOnStore = true;
    }

    function listNFT(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].currentlyListed = true;
    }

    function removeListNFT(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].currentlyListed = false;
        idToListedToken[tokenId].buyers = new address[](0);
    }

    function updatePriceNFT(uint256 tokenId, uint256 price) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].price = price;
    }

    function reserveNFT(uint256 tokenId) public {
        require(msg.sender != idToListedToken[tokenId].seller, "Cannot buy your own NFT");
        require(idToListedToken[tokenId].currentlyListed == true, "This NFT is not on sale");

        uint buyersNumber = idToListedToken[tokenId].buyers.length;
        address[] memory newBuyersList = new address[](buyersNumber+1);


        for(uint i=0;i<buyersNumber;i++){
            newBuyersList[i] = idToListedToken[tokenId].buyers[i];
        }

        newBuyersList[buyersNumber] = msg.sender;
        idToListedToken[tokenId].buyers = newBuyersList;
    }

    function removeBuyer (uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of the NFT");
        require(idToListedToken[tokenId].currentlyListed == true, "This NFT is not on sale");
        require(idToListedToken[tokenId].buyers.length != 0, "This NFT is not on sale");

        uint buyersNumber = idToListedToken[tokenId].buyers.length;
        address[] memory newBuyersList = new address[](buyersNumber-1);
        for (uint i = 0; i<newBuyersList.length; i++){
            newBuyersList[i] = idToListedToken[tokenId].buyers[i+1];
        }
        idToListedToken[tokenId].buyers = newBuyersList;
    }

    function getMarketNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return tokens;
    }
    
    function getNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].seller == msg.sender) {
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint nr_holders = idToListedToken[tokenId].holders;
        address seller = idToListedToken[tokenId].seller;
        address buyer = idToListedToken[tokenId].buyers[0];
        require(idToListedToken[tokenId].currentlyListed == true, "This NFT is not on sale");
        require(idToListedToken[tokenId].isOnStore == true, "The asset is not on store");

        idToListedToken[tokenId].currentlyListed = false;
        idToListedToken[tokenId].isOnStore = false;
        idToListedToken[tokenId].seller = payable(buyer);
        idToListedToken[tokenId].buyers = new address[](0);
        idToListedToken[tokenId].holders = nr_holders + 1;
        _itemsSold.increment();

        _transfer(address(this), buyer, tokenId);

        payable(marketAddress).transfer(feePrice);
        emit TokenSold(
            tokenId,
            seller,
            buyer
        );
    }

    function transferToStore(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].seller;
        address owner = idToListedToken[tokenId].owner;

        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].last_owner = seller;
        idToListedToken[tokenId].seller = payable(owner);
        idToListedToken[tokenId].buyers = new address[](0);

        _transfer(msg.sender, address(this), tokenId);
        
        payable(marketAddress).transfer(feePrice);
        emit TokenTransferedStore(
            tokenId,
            price,
            seller,
            owner
        );
    }
}
