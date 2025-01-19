import yahooFinance from "yahoo-finance2";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const symbols = url.searchParams.get("symbols");
    const stockSymbols = symbols ? symbols.split(",") : [];

    if (stockSymbols.length === 0) {
      return new Response(
        JSON.stringify({ error: "No stock symbols provided." }),
        { status: 400 }
      );
    }

    const fetchStockData = async (symbol: string) => {
      try {
        const data = await yahooFinance.quote(symbol);
        return {
          symbol: data.symbol,
          name: data.shortName,
          price: data.regularMarketPrice,
          high: data.regularMarketDayHigh,
          low: data.regularMarketDayLow,
          change: data.regularMarketChange,
          changePercent: data.regularMarketChangePercent,
        };
      } catch (err) {
        return { symbol, error: "Failed to fetch data." };
      }
    };

    const results = await Promise.all(
      stockSymbols.map((symbol) => fetchStockData(symbol))
    );

    return new Response(JSON.stringify(results), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
