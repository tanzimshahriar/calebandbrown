import React, { useState } from 'react';


const GlobalCardView = (props) => {
    // const { src, fallbackSrc, alt, width, height } = props;
    // const [imgSrc, setImgSrc] = useState((src.includes('http') ? src : (src + '/')));

    const getMarketCap = (name) => {
        const values = Object.values(props.totalMarketCapList);
        let finalVal = null
        Object.keys(props.totalMarketCapList).map((n, i) => {
            if (n == name) {
                finalVal = values[i];
            }
        })
        return finalVal;
    }

    const renderMarketCap = (name) => {
        const markCap = getMarketCap(name);
        console.log(markCap)
        return (
            <div>
                <div className="text-xs font-bold pt-1 pr-1">Market Cap</div>
                <div className="text-sm pt-1 pr-1">{markCap ? ('$' + markCap) : 'N/A'}</div>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 py-6">
                {props.marketCapPercentageList ? Object.keys(props.marketCapPercentageList).map((m, key) => (
                    <div key={key} className="rounded-md px-6 py-6 bg-gray-100 shadow-md flex">
                        <div className="flex-1 flex flex-col">
                            <div className="uppercase font-medium font-lg md:font-xl">{m}</div>
                            {renderMarketCap(m)}
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-xs font-bold">Market Cap %</div>
                            <div className="font-thin text-2xl px-2">{parseFloat(Object.values(props.marketCapPercentageList)[key]).toFixed(2)}%</div>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    );
};

export default GlobalCardView;