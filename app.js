/*
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
---------------------------------------- Coin Search ------------------------------------------
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
*/

function coinSearch() {
  const searchInput = document.getElementById('crypto-search-input');
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm.length === 0) {
    renderResults([]);
    document.getElementById('errorMessage').innerHTML = '';
    return;
  }

  const url = `https://api.coingecko.com/api/v3/coins/list`;
  fetch(url)
    .then((response) => response.json())
    .then((coinsData) => {
      const filteredResults = coinsData.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm) ||
          `${coin.name} (${coin.symbol})`.toLowerCase().includes(searchTerm)
      );
      const results = filteredResults.map(
        (coin) => `${coin.name} (${coin.symbol})`
      );
      renderResults(results);
      document.getElementById('errorMessage').innerHTML = '';
    })
    .catch((error) => {
      document.getElementById('errorMessage').innerHTML = new Error(
        'Failed to fetch data'
      );
      alert(`Failed to fetch data error`);
      renderResults([]);
    });
}

function fetchCoinDetails(coinName) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinName.toLowerCase()}`;
  fetch(url)
    .then((response) => response.json())
    .then((coinDetails) => {
      displayCoinDetails(coinDetails);
    })
    .catch((error) => console.error(error));
}

function displayCoinDetails(coinData) {
  const coinRank = coinData.market_cap_rank;
  const coinName = coinData.name;
  const coinSymbol = coinData.symbol
    ? coinData.symbol.toString().toUpperCase()
    : '';
  const coinThumb = coinData.image?.small || '';
  const coinCurrentPrice = coinData.market_data.current_price.usd;
  const coinToBtc = coinData.market_data.current_price.btc;
  const coinTotalSupply = coinData.market_data.total_supply.toLocaleString();
  const coinLastUpdated = coinData.market_data.last_updated;
  const coinDescription = coinData.description?.en;
  const coinToEur = coinData.market_data.current_price.eur;
  const coinToAud = coinData.market_data.current_price.aud;
  const coinToInr = coinData.market_data.current_price.inr;

  const detailsContainer = document.getElementById('coin-details');
  detailsContainer.innerHTML = `
    <h6><span style="background-color: black; color: white; border-radius: 10px; padding: 5px;"> Rank: #${coinRank} </span></h6> <br>
    <h3><img src="${coinThumb}" alt="${coinName}" style="width: 25px"/> ${coinName} (${coinSymbol})</h3>
    <h4>Current Price: $${coinCurrentPrice}</h4>
    <h6>${coinToBtc} BTC</h6><br>
    <h5>Total Supply: ${coinTotalSupply}</h5>
    <h5>Last Updated: ${coinLastUpdated}</h5><br>
    <p style="font-weight: bold;">Description:</p>
    <p>${coinDescription}</p><br>
    <h4 style="font-weight: bold;">Global Helium Prices:</h4><br>
  <h4>HNT / EUR: €${coinToEur}</h4><br>
  <h4>HNT / AUD: A$${coinToAud}</h4><br>
  <h4>HNT / INR: ₹${coinToInr}</h4><br>
    
  `;
}

function renderResults(results) {
  const menu = document.getElementById('search-results');
  const searchInput = document.getElementById('crypto-search-input');
  menu.innerHTML = '';

  if (results.length > 0) {
    results.slice(0, 10).forEach((result) => {
      const item = document.createElement('li');
      item.innerText = result;
      item.addEventListener('click', () => {
        searchInput.value = result;
        menu.style.display = 'none';
        const coinName = result.split(' (')[0];
        fetchCoinDetails(coinName);
      });
      menu.appendChild(item);
    });

    menu.style.display = 'block';
  } else {
    if (searchInput.value.trim().length > 0) {
      const noResultsItem = document.createElement('li');
      noResultsItem.innerText = 'No results found';
      menu.appendChild(noResultsItem);
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  }
}

let searchTimeoutToken = 0;
window.onload = () => {
  const searchInput = document.getElementById('crypto-search-input');
  const coinDetailsContainer = document.getElementById('coin-details');

  searchInput.onkeyup = (event) => {
    clearTimeout(searchTimeoutToken);

    if (searchInput.value.trim().length === 0) {
      renderResults([]);
      coinDetailsContainer.innerHTML = '';
      return;
    }

    setTimeout(() => {
      coinSearch();
    }, 370);
  };

  searchInput.addEventListener('search', () => {
    if (searchInput.value.trim().length === 0) {
      renderResults([]);
      coinDetailsContainer.innerHTML = '';
    }
  });

  searchInput.addEventListener('click', () => {
    coinSearch();
  });
};

/*
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
------------------------------------ Coin Table Data ------------------------------------------
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
*/

async function fetchData() {
  try {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw error;
  }
}
fetchData();
async function updateTable() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  try {
    const coinData = await fetchData();
    coinData.forEach((coin, index) => {
      const newRow = createTableRow(index + 1, coin);
      tableBody.appendChild(newRow);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

function createTableRow(rank, data) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${rank}</td>
    <td><img src="${data.image}" alt="${
    data.name
  }" width="13"> <span class="coinName"><a style="color: black; text-decoration: none;" href="#" onclick="fetchCoinDetails('${
    data.id
  }')">${data.name}</a></span></td>
    <td>$${data.current_price.toLocaleString()}</td>
    <td>${data.price_change_percentage_1h_in_currency.toFixed(2)}%</td>
    <td>${data.price_change_percentage_24h.toFixed(2)}%</td>
    <td>${data.price_change_percentage_7d_in_currency.toFixed(2)}%</td>
    <td>$${data.total_volume.toLocaleString()}</td>
    <td>$${data.market_cap.toLocaleString()}</td>
    <td>${data.last_updated}</td>
  `;
  return row;
}

updateTable();

// TODO : Display the chart of the coin :( the API link for the chart :
// TODO : https://api.coingecko.com/api/v3/coins/helium/market_chart?vs_currency=usd&days=1
