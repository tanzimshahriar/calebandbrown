import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'components/loading';
import Image from 'next/image';

const Home = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currency, setCurrency] = useState("aud");
  const [order, setOrder] = useState("market_cap_desc");
  const [page, setPage] = useState(0);

  const round = (value, exp) => {
    if (typeof exp === 'undefined' || +exp === 0)
      return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
      return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  }

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coins/markets?vs_currency=${currency}&order=${order}&per_page=10&page=${page}&sparkline=false`)
      .then(res => {
        console.log(res.data);
        setError(false);
        setMarkets(prevState => [...prevState, ...res.data]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-4 py-4 md:px-12 md:py-8 lg:py-16 lg:px-16 xl:px-24 font-thin text-md">
      <h1 className="text-2xl md:text-4xl">
        Top Analytics Coins By Market
      </h1>

      <div className="overflow-x-auto w-full">
        {!error && loading && <Loading />}
        {error && <div>There was an error.</div>}
        {!error && markets && (
          <table className="auto my-6 md:my-10 text-xs md:text-lg w-full border-r border-l border-t border-gray-100">
            <thead>
              <tr className="shadow-sm">
                <th className="px-2 text-left font-thin">Rank</th>
                <th className="pr-2 text-left font-thin">Name</th>
                <th className="pr-2 text-left font-thin">Symbol</th>
                <th className="pr-2 text-right font-thin">Price</th>
                <th className="pr-2 text-right font-thin">Price 24H</th>
                <th className="pr-2 text-right font-thin">Market Capital</th>
                <th className="pr-2 text-right font-thin">Market Cap 24h</th>
                <th className="pr-2 text-right font-thin">Market Cap 24h %</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market, key) => (
                <tr key={key} className="shadow-md font-medium">
                  <td className="px-2 py-2 sm:py-4 font-thin">{market.market_cap_rank}</td>
                  <td className="pr-2 py-2">{market.name}</td>
                  <td className="uppercase pr-2 py-2 sm:py-4 flex items-center justify-start gap-x-2">
                    <Image src={market.image} alt="Vercel Logo" width={20} height={20} />
                    <div>{market.symbol}</div>
                  </td>
                  <td className="pr-2 text-right py-2 sm:py-4">${market.current_price}</td>
                  <td className={'pr-2 text-right py-2 sm:py-4' + (market.price_change_percentage_24h >= 0 ? ' text-irises' : ' text-red')}>{market.price_change_percentage_24h}%</td>
                  <td className="pr-2 text-right py-2 sm:py-4">${market.market_cap}</td>
                  <td className={'pr-2 text-right py-2 sm:py-4' + (market.price_change_24h >= 0 ? ' text-irises' : ' text-red')}>${market.market_cap_change_24h}</td>
                  <td className={'pr-2 text-right py-2 sm:py-4' + (market.price_change_percentage_24h >= 0 ? ' text-irises' : ' text-red')}>{market.market_cap_change_percentage_24h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
};

export default Home;
