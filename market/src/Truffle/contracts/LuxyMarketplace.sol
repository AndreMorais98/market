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
        address payable marketAddress;
        address payable owner;
        address payable seller;
        address [] buyers;
        bool currentlyListed;
        bool isOnStore;
    }

    event TokenListedSuccess (
        uint256 indexed tokenId,
        uint256 price,
        address marketAddress,
        address owner,
        address seller,
        bool currentlyListed,
        bool isOnStore
    );

    event TokenSold (
        uint256 indexed tokenId,
        uint256 price,
        address seller,
        address buyer
    );

    mapping(uint256 => ListedToken) private idToListedToken;
    mapping(uint256 => ListedToken) private idToAllToken;

    constructor() ERC721("LuxyMarketplace", "LUXYMP") {
        marketAddress = payable(msg.sender);
    }

    function getFeePrice() public view returns (uint256) {
        return feePrice;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
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
        require(msg.value == feePrice, "Hopefully sending the correct price");

        idToListedToken[tokenId] = ListedToken(
            tokenId,
            price,
            payable(address(this)),
            payable(msg.sender),
            payable(msg.sender),
            new address[](0),
            false,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit TokenListedSuccess(
            tokenId,
            price,
            address(this),
            msg.sender,
            msg.sender,
            false,
            false
        );
    }

    function isOnStore(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].isOnStore = true;
    }

    function listNFT(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].currentlyListed = true;
    }

    function masterListNFT(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the seller of this NFT");
        require(msg.sender == idToListedToken[tokenId].owner, "You are not the creator of this NFT");
        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].isOnStore = true;
    }

    function removeListNFT(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].isOnStore = false;
        idToListedToken[tokenId].currentlyListed = false;
        idToListedToken[tokenId].buyers = new address[](0);
    }

    function updatePriceNFT(uint256 tokenId, uint256 price) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].price = price;
    }

    function isTheOwner(uint256 tokenId, address seller) public returns (bool) {
        if (idToListedToken[tokenId].seller == seller) {
            return true;
        }
        return false;
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

    function getFirstBuyer (uint256 tokenId) public returns (address) {
        return idToListedToken[tokenId].buyers[0];
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

    function executeSale(uint256 tokenId, bool firstTrade) public payable {
        uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].seller;
        address owner = idToListedToken[tokenId].owner;
        address buyer = idToListedToken[tokenId].buyers[0];
        if (firstTrade) {
            require(msg.sender == owner, "You are not the creator of the NFT");
        }
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        require(msg.sender == seller, "You are not the owner of the NFT");
        require(idToListedToken[tokenId].currentlyListed == true, "This NFT is not on sale");
        require(idToListedToken[tokenId].isOnStore == true, "The asset is not on store");

        idToListedToken[tokenId].currentlyListed = false;
        idToListedToken[tokenId].isOnStore = false;
        idToListedToken[tokenId].seller = payable(buyer);
        idToListedToken[tokenId].buyers = new address[](0);
        _itemsSold.increment();

        _transfer(address(this), buyer, tokenId);
        approve(address(this), tokenId);
        approve(owner, tokenId);

        payable(owner).transfer(feePrice);
        payable(seller).transfer(msg.value);
        emit TokenSold(
            tokenId,
            price,
            seller,
            buyer
        );
    }
}
