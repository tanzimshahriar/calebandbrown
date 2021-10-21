import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'components/loading';
import ImageWithFallback from 'components/imageWithFallback';
import Pagination from 'components/pagination';
import Dropdown from 'components/dropdown';
import GlobalCardView from 'components/globalCardView';

const GlobalMarket = () => {

    const [global, setGlobal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/global`)
            .then(res => {
                console.log(res.data)
                setError(false);
                setGlobal(res.data.data);
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
    }, []);

    return (
        <div className="h-full px-4 py-4 md:px-12 md:py-8 lg:py-16 lg:px-16 xl:px-24 font-thin text-md">
            <div className="h-full w-full">
                {!error && loading && <Loading />}
                {error &&
                    <div className="py-2 md:py-4">
                        <div className="text-4xl">Something went wrong</div>
                        <div className="text-xl py-4">Make sure you are connected to the internet and try again.</div>
                    </div>}
                {!error && global && (
                    <div className="h-full flex flex-col">
                        <h1 className="text-2xl md:text-4xl">
                            Top Cryptos in Global Market
                        </h1>
                        <GlobalCardView total_crypto={global.active_cryptocurrencies} marketCapChange24h={global.market_cap_change_percentage_24h_usd} marketCapPercentageList={global.market_cap_percentage} markets={global.markets} totalMarketCapList={global.total_market_cap} totalVolume={global.total_volume} />
                    </div>
                )}
            </div>
        </div>
    )
};

export default GlobalMarket;
