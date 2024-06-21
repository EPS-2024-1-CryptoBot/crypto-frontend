
const logs = [
  "2024-06-20 21:09:01,713 INFO :: Getting Binance trade size...",
  "2024-06-20 21:09:01,714 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:09:02,124 DEBUG :: https://testnet.binancefuture.com:443 'GET /fapi/v2/account?timestamp=1718928541713&signature=c6072585ebdc63a93367228e1f9347adc09e549c0e5c612ea86b918f587efab8 HTTP/1.1' 200 None",
  "2024-06-20 21:09:02,126 INFO :: Binance current USDT balance = 14758.98238666, trade size = 0.045",
  "2024-06-20 21:09:02,126 INFO :: Short signal on BTCUSDT 15m",
  "2024-06-20 21:09:02,127 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:09:02,536 DEBUG :: https://testnet.binancefuture.com:443 'POST /fapi/v1/order?symbol=BTCUSDT&side=SELL&quantity=0.045&type=MARKET&timestamp=1718928542126&signature=7476c6080a058046e1df69fa9359466982046ad1562b0ce6dace1b5077d1734e HTTP/1.1' 200 None",
  "2024-06-20 21:09:02,538 INFO :: Sell order placed on Binance | Status: new",
  "2024-06-20 21:09:04,540 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:09:04,909 DEBUG :: https://testnet.binancefuture.com:443 'GET /fapi/v1/order?timestamp=1718928544539&symbol=BTCUSDT&orderId=4044591878&signature=0aaf8e3b973a1e06aedc7879280df6cdec4b0b72695c8c15fad8fbfb53b1dd57 HTTP/1.1' 200 None",
  "2024-06-20 21:09:04,913 INFO :: Binance order status: filled",
  "2024-06-20 21:09:40,069 INFO :: Stop loss for BTCUSDT 15m | Current Price = 65900.0 (Entry price was 65676.0)",
  "2024-06-20 21:09:40,072 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:09:40,628 DEBUG :: https://testnet.binancefuture.com:443 'POST /fapi/v1/order?symbol=BTCUSDT&side=BUY&quantity=0.045&type=MARKET&timestamp=1718928580069&signature=50869fff8140532441a67aa67c6e949cf7a3431e57183c9b665fb4d3649692fc HTTP/1.1' 200 None",
  "2024-06-20 21:09:40,632 INFO :: Exit order on BTCUSDT 15m placed successfully",
  "2024-06-20 21:09:48,309 INFO :: Getting Binance trade size...",
  "2024-06-20 21:09:48,311 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:09:48,820 DEBUG :: https://testnet.binancefuture.com:443 'GET /fapi/v2/account?timestamp=1718928588309&signature=61d295f79b5523f5d9de3c9996dddd1681d574105b5d0ba6ce55cc8a4390c918 HTTP/1.1' 200 None",
  "2024-06-20 21:09:48,825 INFO :: Binance current USDT balance = 14749.25557429, trade size = 0.045",
  "2024-06-20 21:09:48,825 INFO :: Short signal on BTCUSDT 15m",
  "2024-06-20 21:09:48,826 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:09:49,228 DEBUG :: https://testnet.binancefuture.com:443 'POST /fapi/v1/order?symbol=BTCUSDT&side=SELL&quantity=0.045&type=MARKET&timestamp=1718928588825&signature=a6531658d2143362767500097c90519477f2483c8ae1478e2bc26ac228ec4610 HTTP/1.1' 200 None",
  "2024-06-20 21:09:49,232 INFO :: Sell order placed on Binance | Status: new",
  "2024-06-20 21:09:51,235 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:09:51,686 DEBUG :: https://testnet.binancefuture.com:443 'GET /fapi/v1/order?timestamp=1718928591232&symbol=BTCUSDT&orderId=4044591916&signature=e682515719105d41e3d2ebf3cc557d0063c53449fadd97f944c53205ef487b4a HTTP/1.1' 200 None",
  "2024-06-20 21:09:51,689 INFO :: Binance order status: filled",
  "2024-06-20 21:10:03,051 INFO :: Stop loss for BTCUSDT 15m | Current Price = 65813.3 (Entry price was 65676.0)",
  "2024-06-20 21:10:03,053 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
  "2024-06-20 21:10:03,565 DEBUG :: https://testnet.binancefuture.com:443 'POST /fapi/v1/order?symbol=BTCUSDT&side=BUY&quantity=0.045&type=MARKET&timestamp=1718928603051&signature=bc429236b2b8eaaee21980e38d4fa4f68905207746392d9a5845aee449707bb2 HTTP/1.1' 200 None",
  "2024-06-20 21:10:03,568 INFO :: Exit order on BTCUSDT 15m placed successfully",
  "2024-06-20 21:14:35,336 INFO :: Getting Binance trade size...",
  "2024-06-20 21:14:35,336 DEBUG :: Starting new HTTPS connection (1): testnet.binancefuture.com:443",
];

const Logging = () => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4">Logs</h2>
      <div className="space-y-2">
        {logs.map((log, index) => (
          <p key={index} className=" p-2 rounded-lg shadow-sm border border-gray-200 break-words whitespace-normal">
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Logging;
