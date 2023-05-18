async function fetchData(cryptoCurrency) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoCurrency}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw error;
  }
}

fetchData('helium');

//	List all coins with id, name, and symbol
// async function listData() {
//   try {
//     const url = `https://api.coingecko.com/api/v3/coins/list?include_platform=true`;
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     throw error;
//   }
// }

// listData('helium');

// https://api.coingecko.com/api/v3/coins/helium //	Get current data for a coin

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en
// List all coins with market data

// https://api.coingecko.com/api/v3/nfts/list // nft list

// https://api.coingecko.com/api/v3/search?query=helium // List of coins, categories and markets matching search term ordered by market cap
