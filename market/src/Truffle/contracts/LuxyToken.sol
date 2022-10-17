pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LuxyToken is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint32 public size;
    address public creator;
    string uri;

    constructor(uint32 _size, string memory _name, string memory _symbol, string memory _uri) ERC721(_name, _symbol) {
        uri = _uri;
        size = _size;
        creator = msg.sender;
        for(uint32 i=0; i < size ; i++){
            _safeMint(msg.sender, i);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return uri;
    }
    
}
