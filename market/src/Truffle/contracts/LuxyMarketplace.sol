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
    //smart contract owner
    address payable owner;
    //The fee charged to list an NFT ~ 0.01 matic
    uint256 feePrice = 0.0000008 ether;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        uint256 price;
        address payable owner;
        address payable seller;
        address [] buyers;
        bool currentlyListed;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        uint256 price,
        address owner,
        address seller,
        bool currentlyListed
    );

    event TokenSold (
        uint256 indexed tokenId,
        uint256 price,
        address seller,
        address buyer
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;
    mapping(uint256 => ListedToken) private idToAllToken;

    constructor() ERC721("LuxyMarketplace", "LUXYMP") {
        owner = payable(msg.sender);
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

    function createToken(uint32 _size, string memory _name, string memory _symbol, string memory _uri, uint256 price) public payable {

        for(uint32 i=0; i < _size ; i++){
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _safeMint(msg.sender, newTokenId);
            _setTokenURI(newTokenId, _uri);
            createListedToken(newTokenId, price);
        }
    }

    function createListedToken(uint256 tokenId, uint256 price) private {
        //Make sure the sender sent enough ETH to pay for listing
        require(msg.value == feePrice, "Hopefully sending the correct price");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            price,
            payable(address(this)),
            payable(msg.sender),
            new address[](0),
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            price,
            address(this),
            msg.sender,
            false
        );
    }

    function listNFT(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].currentlyListed = true;

    }

    function removeListNFT(uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of this NFT");
        idToListedToken[tokenId].currentlyListed = false;
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

        uint buyersNumber = getBuyersLength(tokenId);
        address[] memory newBuyersList = new address[](buyersNumber+1);


        for(uint i=0;i<buyersNumber;i++){
            newBuyersList[i] = idToListedToken[tokenId].buyers[i];
        }

        newBuyersList[buyersNumber] = msg.sender;
        idToListedToken[tokenId].buyers = newBuyersList;
    }

    function getBuyersLength (uint256 tokenId) private returns (uint256) {
        return idToListedToken[tokenId].buyers.length;
    }

    function removeBuyer (uint256 tokenId) public {
        require(msg.sender == idToListedToken[tokenId].seller, "You are not the owner of the NFT");
        require(idToListedToken[tokenId].currentlyListed == true, "This NFT is not on sale");
        if (idToListedToken[tokenId].buyers.length != 0) {
            uint buyersNumber = getBuyersLength(tokenId);
            address[] memory newBuyersList = new address[](buyersNumber);

            for (uint i = 0; i<newBuyersList.length-1; i++){
                newBuyersList[i] = idToListedToken[tokenId].buyers[i+1];
            }
            delete newBuyersList[newBuyersList.length-1];
            idToListedToken[tokenId].buyers = newBuyersList;
        }
    }

    //This will return all the NFTs currently listed on the marketplace
    function getMarketNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            if(idToListedToken[currentId].currentlyListed == true)
            {
                ListedToken storage currentItem = idToListedToken[currentId];
                tokens[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }
    
    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender) {
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        // uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].seller;
        address buyer = idToListedToken[tokenId].buyers[0];
        // require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        require(msg.sender == seller, "You are not the owner of the NFT");
        require(idToListedToken[tokenId].currentlyListed == true, "This NFT is not on sale");


        //update the details of the token
        idToListedToken[tokenId].currentlyListed = false;
        idToListedToken[tokenId].seller = payable(buyer);
        idToListedToken[tokenId].buyers = new address[](0);
        _itemsSold.increment();

        //Actually transfer the token to the new owner
        _transfer(address(this), buyer, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(feePrice);
        //Transfer the proceeds from the sale to the seller of the NFT
        // payable(seller).transfer(msg.value);
    }
}
