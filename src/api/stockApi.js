const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY;
const BASE_URL = "https://www.alphavantage.co/query?";

export async function fetchStockQuote(symbol) {
  const url = `${BASE_URL}function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
    return {
      symbol: data["Global Quote"]["01. symbol"],
      price: data["Global Quote"]["05. price"]
    };
  } else {
    throw new Error("Stock not found or API error");
  }
}
