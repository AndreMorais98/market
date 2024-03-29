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


Parse.Cloud.define("sol-balance", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.SolApi.account.getBalance(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-balance'));
  }
})

Parse.Cloud.define("sol-getSPL", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.SolApi.account.getSPL(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getSPL'));
  }
})

Parse.Cloud.define("sol-getNFTs", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.SolApi.account.getNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getNFTs'));
  }
})

Parse.Cloud.define("sol-getPortfolio", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.SolApi.account.getPortfolio(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getPortfolio'));
  }
})

Parse.Cloud.define("sol-getNFTMetadata", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.SolApi.nft.getNFTMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getNFTMetadata'));
  }
})

Parse.Cloud.define("sol-getTokenPrice", async ({params, user, ip}: any) => {
  try {
    const result = await Moralis.SolApi.token.getTokenPrice(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'sol-getTokenPrice'));
  }
})

