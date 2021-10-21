import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/loading';
import ImageWithFallback from 'components/imageWithFallback';
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/pagination';

const Home = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currency, setCurrency] = useState("aud");
  const [order, setOrder] = useState("market_cap_desc");

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(null);

  const countTotalPages = (n) => {
    if (n % itemsPerPage == 0) {
      return n / itemsPerPage;
    } else {
      return (parseInt(n / itemsPerPage) + 1);
    }
  }

  const fetchData = async () => {
    setLoading(true);
    if (totalPages == null) {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coins/list`)
        .then(res => {
          setTotalPages(countTotalPages(res.data.length))
        })
    }
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coins/markets?vs_currency=${currency}&order=${order}&per_page=${itemsPerPage}&page=${page + 1}&sparkline=false`)
      .then(res => {
        setError(false);
        setMarkets([...res.data]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  };
  useEffect(() => {
    fetchData();
  }, [page, order]);

  return (
    <div className="px-4 py-4 md:px-12 md:py-8 lg:py-16 lg:px-16 xl:px-24 font-thin text-md">
      <h1 className="text-2xl md:text-4xl font-medium">
        Top Analytics Coins By Market
      </h1>

      <div className="w-full">
        {!error && loading && <Loading />}
        {error && <div className="px-6 py-6">There was an error.</div>}
        {!error && markets && (
          <div>
            <div className="w-full overflow-x-auto">
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
                    <th className="pr-2 text-right font-thin">Market Cap 24h%</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((market, key) => (
                    <tr key={key} className="shadow-md font-medium">
                      <td className={'px-4 py-2 sm:py-4' + (market.market_cap_rank ? '' : ' text-xs md:text-sm font-thin')}>{market.market_cap_rank ? market.market_cap_rank : 'N/A'}</td>
                      <td className="pr-2 py-2">{market.name ? market.name : N / A}</td>
                      <td className="uppercase pr-2 py-2 sm:py-4 flex items-center justify-start gap-x-2">
                        <ImageWithFallback src={market.image} alt="Vercel Logo" fallbackSrc="/question.jpg" width={20} height={20} />
                        <div>{market.symbol}</div>
                      </td>
                      <td className={'pr-2 text-right py-2 sm:py-4' + (market.current_price ? '' : ' text-xs md:text-sm font-thin')}>{market.current_price ? ('$' + market.current_price) : 'N/A'}</td>
                      <td className={'pr-2 text-right py-2 sm:py-4' + (market.price_change_percentage_24h ? (market.price_change_percentage_24h >= 0 ? ' text-irises' : ' text-red') : ' text-xs md:text-sm font-thin')}>{market.price_change_percentage_24h ? (market.price_change_percentage_24h + '%') : 'N/A'}</td>
                      <td className={'pr-2 text-right py-2 sm:py-4' + (market.market_cap ? '' : ' text-xs md:text-sm font-thin')}>{market.market_cap ? ('$' + market.market_cap) : 'N/A'}</td>
                      <td className={'pr-2 text-right py-2 sm:py-4' + (market.market_cap_change_24h ? (market.market_cap_change_24h >= 0 ? ' text-irises' : ' text-red') : ' text-xs md:text-sm font-thin')}>{market.market_cap_change_24h ? ('$' + market.market_cap_change_24h) : 'N/A'}</td>
                      <td className={'pr-2 text-right py-2 sm:py-4' + (market.market_cap_change_percentage_24h ? (market.market_cap_change_percentage_24h >= 0 ? ' text-irises' : ' text-red') : ' text-xs md:text-sm font-thin')}>{market.market_cap_change_percentage_24h ? (market.market_cap_change_percentage_24h + '%') : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages ? <Pagination numberOfPages={totalPages} currentPage={page} changePage={(p) => setPage(p)} /> : null}
          </div>
        )}
      </div>
    </div>
  )
};

export default Home;
