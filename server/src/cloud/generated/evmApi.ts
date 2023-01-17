/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Moralis from 'moralis'
import { MoralisError } from '@moralisweb3/common-core';
import { AxiosError } from 'axios'
declare const Parse: any;

const getErrorMessage = (error: Error, name: string) => {
  // Resolve Axios data inside the MoralisError
  if (
    error instanceof MoralisError &&
    error.cause &&
    error.cause instanceof AxiosError &&
    error.cause.response &&
    error.cause.response.data
  ) {
    return JSON.stringify(error.cause.response.data);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return `API error while calling ${name}`
}

Parse.Cloud.define("getBlock", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.block.getBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getBlock'));
  }
})

Parse.Cloud.define("getDateToBlock", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.block.getDateToBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getDateToBlock'));
  }
})

Parse.Cloud.define("getLogsByAddress", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.events.getContractLogs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getLogsByAddress'));
  }
})

Parse.Cloud.define("getNFTTransfersByBlock", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTTransfersByBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTransfersByBlock'));
  }
})

Parse.Cloud.define("getTransaction", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.transaction.getTransaction(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransaction'));
  }
})

Parse.Cloud.define("getContractEvents", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.events.getContractEvents(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getContractEvents'));
  }
})

Parse.Cloud.define("runContractFunction", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.utils.runContractFunction(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'runContractFunction'));
  }
})

Parse.Cloud.define("getTransactions", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.transaction.getWalletTransactions(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransactions'));
  }
})

Parse.Cloud.define("getNativeBalance", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.balance.getNativeBalance(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNativeBalance'));
  }
})

Parse.Cloud.define("getTokenBalances", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.token.getWalletTokenBalances(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenBalances'));
  }
})

Parse.Cloud.define("getTokenTransfers", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.token.getWalletTokenTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenTransfers'));
  }
})

Parse.Cloud.define("getNFTs", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getWalletNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTs'));
  }
})

Parse.Cloud.define("getNFTTransfers", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getWalletNFTTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTransfers'));
  }
})

Parse.Cloud.define("getWalletNFTCollections", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getWalletNFTCollections(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getWalletNFTCollections'));
  }
})

Parse.Cloud.define("getNFTsForContract", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getWalletNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTsForContract'));
  }
})

Parse.Cloud.define("getTokenMetadata", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.token.getTokenMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenMetadata'));
  }
})

Parse.Cloud.define("getNFTTrades", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTTrades(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTrades'));
  }
})

Parse.Cloud.define("getNFTLowestPrice", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTLowestPrice(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTLowestPrice'));
  }
})

Parse.Cloud.define("getTokenMetadataBySymbol", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.token.getTokenMetadataBySymbol(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenMetadataBySymbol'));
  }
})

Parse.Cloud.define("getTokenPrice", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.token.getTokenPrice(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenPrice'));
  }
})

Parse.Cloud.define("getTokenAddressTransfers", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.token.getTokenTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenAddressTransfers'));
  }
})

Parse.Cloud.define("getTokenAllowance", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.token.getTokenAllowance(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenAllowance'));
  }
})

Parse.Cloud.define("searchNFTs", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.searchNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'searchNFTs'));
  }
})

Parse.Cloud.define("getNftTransfersFromToBlock", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTTransfersFromToBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNftTransfersFromToBlock'));
  }
})

Parse.Cloud.define("getAllTokenIds", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getContractNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getAllTokenIds'));
  }
})

Parse.Cloud.define("getContractNFTTransfers", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTContractTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getContractNFTTransfers'));
  }
})

Parse.Cloud.define("getNFTOwners", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTOwners(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTOwners'));
  }
})

Parse.Cloud.define("getNFTMetadata", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTContractMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTMetadata'));
  }
})

Parse.Cloud.define("reSyncMetadata", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.reSyncMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'reSyncMetadata'));
  }
})

Parse.Cloud.define("syncNFTContract", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.syncNFTContract(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'syncNFTContract'));
  }
})

Parse.Cloud.define("getTokenIdMetadata", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenIdMetadata'));
  }
})

Parse.Cloud.define("getTokenIdOwners", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTTokenIdOwners(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenIdOwners'));
  }
})

Parse.Cloud.define("getWalletTokenIdTransfers", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.nft.getNFTTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getWalletTokenIdTransfers'));
  }
})

Parse.Cloud.define("resolveDomain", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.resolve.resolveDomain(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'resolveDomain'));
  }
})

Parse.Cloud.define("resolveAddress", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.resolve.resolveAddress(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'resolveAddress'));
  }
})

Parse.Cloud.define("getPairReserves", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.defi.getPairReserves(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getPairReserves'));
  }
})

Parse.Cloud.define("getPairAddress", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.defi.getPairAddress(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getPairAddress'));
  }
})

Parse.Cloud.define("uploadFolder", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.EvmApi.ipfs.uploadFolder(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'uploadFolder'));
  }
})

Parse.Cloud.define("web3ApiVersion", async ({params, user, ip}: any) => {
  try {
    // @ts-ignore
    const result = await Moralis.EvmApi.utils.web3ApiVersion(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'web3ApiVersion'));
  }
})

Parse.Cloud.define("endpointWeights", async ({params, user, ip}: any) => {
  try {
    // @ts-ignore
    const result = await Moralis.EvmApi.utils.endpointWeights(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'endpointWeights'));
  }
})

