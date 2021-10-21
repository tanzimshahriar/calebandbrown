import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'components/loading';
import ImageWithFallback from 'components/imageWithFallback';
import Pagination from 'components/pagination';
import Dropdown from 'components/dropdown';

const Volume = () => {
    const ORDERS = ["volume_desc", "volume_asc", "id_asc", "id_desc", "price_desc", "price_asc"];
    const SORT_OPTIONS = ["Total Volume High", "Total Volume Low", "Name High", "Name Low", "Price High", "Price Low"]

    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [inputError, setInputError] = useState(null);
    const [itemsPerPageInput, setItemsPerPageInput] = useState("20")

    const [currency, setCurrency] = useState("aud");
    const [order, setOrder] = useState(0);

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

    const onEnter = (e) => {
        if (e.key == "Enter") {
            if (/^-?\d+$/.test(itemsPerPageInput) && parseInt(itemsPerPageInput) >= 10 && parseInt(itemsPerPageInput) <= 250) {
                setItemsPerPage(parseInt(itemsPerPageInput));
                setPage(0);
                setInputError("");
            } else {
                setInputError("*must be a number between 10 and 250");
            }
        }
    }


    const fetchTotalPages = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coins/list`)
            .then(res => {
                setTotalPages(countTotalPages(res.data.length))
            })
            .catch(() => {
                setError(true);
            })
    }

    const fetchData = async (updatePageList = false) => {
        setLoading(true);
        if (totalPages == null || updatePageList) {
            await fetchTotalPages();
        }
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coins/markets?vs_currency=${currency}&order=${ORDERS[order]}&per_page=${itemsPerPage}&page=${page + 1}&sparkline=false`)
            .then(res => {
                console.log(res.data)
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
        if (itemsPerPage.current != itemsPerPage) {
            fetchData(true);
        } else {
            fetchData();
        }
    }, [page, order, itemsPerPage]);

    return (
        <div className="h-full px-4 py-4 md:px-12 md:py-8 lg:py-16 lg:px-16 xl:px-24 font-thin text-md">
            <div className="h-full w-full">
                {!error && loading && <Loading />}
                {error &&
                    <div className="py-2 md:py-4">
                        <div className="text-4xl">Something went wrong</div>
                        <div className="text-xl py-4">Make sure you are connected to the internet and try again.</div>
                    </div>}
                {!error && markets && (
                    <div className="h-full flex flex-col">
                        <h1 className="text-2xl md:text-4xl">
                            Trending Coins By Volume
                        </h1>
                        <div className="mt-4 flex justify-end flex-wrap">
                            <Dropdown values={SORT_OPTIONS} val={order} click={(i) => setOrder(i)} />
                            <div className="text-xs sm:text-sm">
                                Results per page: <input type="text" onKeyDown={onEnter} value={itemsPerPageInput} onChange={(e) => setItemsPerPageInput(e.target.value)} className="mx-1 w-8 sm:w-12 px-1 sm:px-2 py-1 shadow-md rounded-md text-xs sm:text-sm font-thin border-t border-gray-100"></input>
                            </div>

                        </div>
                        <div className="mb-4 text-right text-red small-text">{inputError}</div>
                        <div className="w-full overflow-x-auto">
                            <table className="auto my-2 md:my-4 text-xs md:text-lg w-full border-r border-l border-t border-gray-100">
                                <thead>
                                    <tr className="shadow-sm">
                                        <th className="px-4 text-left font-thin">Name</th>
                                        <th className="pr-2 text-left font-thin">Symbol</th>
                                        <th className="pr-2 text-right font-thin">Price</th>
                                        <th className="pr-2 text-right font-thin">Circulating Supply</th>
                                        <th className="pr-2 text-right font-thin">Total Supply</th>
                                        <th className="pr-2 text-right font-thin">Total Volume</th>
                                        <th className="px-4 text-right font-thin">Diluted Valuation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {markets.map((market, key) => (
                                        <tr key={key} className="shadow-md font-medium">
                                            <td className="px-4 py-2">{market.name ? market.name : N / A}</td>
                                            <td className="uppercase pr-2 py-2 sm:py-4 flex items-center justify-start gap-x-2">
                                                <ImageWithFallback src={market.image} alt="Vercel Logo" fallbackSrc="/question.jpg" width={20} height={20} />
                                                <div>{market.symbol}</div>
                                            </td>
                                            <td className={'pr-2 text-right py-2 sm:py-4' + (market.current_price ? '' : ' text-xs md:text-sm font-thin')}>{market.current_price ? ('$' + market.current_price) : 'N/A'}</td>
                                            <td className={'pr-2 text-right py-2 sm:py-4' + (market.circulating_supply ? '' : ' text-xs md:text-sm font-thin')}>{market.circulating_supply ? market.circulating_supply : 'N/A'}</td>
                                            <td className={'pr-2 text-right py-2 sm:py-4' + (market.total_supply ? '' : ' text-xs md:text-sm font-thin')}>{market.total_supply ? market.total_supply : 'N/A'}</td>
                                            <td className={'pr-2 text-right py-2 sm:py-4' + (market.total_volume ? '' : ' text-xs md:text-sm font-thin')}>{market.total_volume ? market.total_volume : 'N/A'}</td>
                                            <td className={'px-4 text-right py-2 sm:py-4' + (market.fully_diluted_valuation ? '' : ' text-xs md:text-sm font-thin')}>{market.fully_diluted_valuation ? market.fully_diluted_valuation : 'N/A'}</td>
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

export default Volume;
