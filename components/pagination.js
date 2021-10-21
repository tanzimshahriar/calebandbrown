import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

import { useState } from 'react';

export default function Pagination(props) {
    const MAX_PAGES_TO_SHOW = 10;

    // props.number of pages is the total number of pages, some of them shown depending on props.currentPage
    // pages is the total number of shown pages


    const [pages, setPages] = useState([0]);
    // const [page, setPage] = useState({ ...props.currentPage });

    useEffect(() => {
        setPages(setPagesByCurrentPage(props.currentPage));
    }, [props.currentPage])


    const setPagesByCurrentPage = (currentPage) => {
        // set the array if number of pages is more than usual
        if (props.numberOfPages > MAX_PAGES_TO_SHOW) {

            // current page should be in the middle and 4 pages on the left and 4 pages on the right when the options are available

            // if from page 0-3 
            if (currentPage >= 0 && currentPage < 4) {
                var temp = []
                for (var i = 0; i < 9; i++) {
                    temp.push(i);
                }
                return ([...temp]);

                // if from page 4 to (last page - 4) = (props.numberOfPages - 1) - 4 
            } else if (currentPage >= 4 && currentPage < (props.numberOfPages - 5)) {
                var temp = []
                for (var i = (currentPage - 4); i < (currentPage + 5); i++) {
                    temp.push(i);
                }
                return ([...temp]);

                //else doesnt work completely. While loading after page change, i.e. when currentPage==null pagination switches to last 9 page 
                // if in last 9 pages;
                // 92 93 94 95 96 97 98 99 100
                // if total 100 pages and currentPage=91(Actual 92) 
                // 91 > 100 - 10
            } else if (currentPage > props.numberOfPages - 10) {
                var temp = []
                for (var i = props.numberOfPages - 10; i < props.numberOfPages; i++) {
                    temp.push(i);
                }
                return ([...temp]);
            } else {
                return [...pages];
            }

        } else {
            return props.numberOfPages ? [...Array(props.numberOfPages).keys()] : [];
        }
    }

    const pageClicked = async (p) => {

        if (p == props.currentPage || p < 0 || p >= props.numberOfPages) return;

        props.changePage(p);
        setPages(setPagesByCurrentPage());

    }

    return (
        <div className="flex items-end flex-1">
            <div className="flex flex-wrap gap-y-1 w-full justify-center text-xs md:text-md font-medium py-4">
                <div
                    className="flex items-center mr-1 px-1 md:px-4 md:py-2 md:mx-1 rounded-sm md:rounded-md hover:bg-irises hover:text-white cursor-pointer bg-gray-200"
                    onClick={() => pageClicked(props.currentPage - 1)}
                >
                    <FontAwesomeIcon className="h-2 w-2 md:h-5 md:w-5" icon={faAngleLeft} />
                </div>
                {
                    props.numberOfPages > MAX_PAGES_TO_SHOW && pages && pages.length > 0 && pages[0] != 0 ?
                        <div className="flex">
                            <div
                                className="flex items-center px-1 mr-1 md:px-4 md:py-2 md:mx-1 rounded-sm md:rounded-md hover:bg-irises hover:text-white cursor-pointer bg-gray-200"
                                onClick={() => pageClicked(0)}
                            >1
                            </div>
                            <div
                                className="flex items-center px-1 mr-1 md:px-4 md:py-2 md:mx-1 rounded-sm md:rounded-md bg-gray-200"
                            >...
                            </div>
                        </div>
                        : null
                }
                {
                    [...pages].length != props.numberOfPages ?
                        [...pages].map((v, i) =>
                            <div
                                id={`page-btn-${v}`}
                                key={v}
                                className={'flex items-center px-1 mr-1 md:px-4 md:py-2 md:mx-1 rounded-sm md:rounded-md hover:bg-irises hover:text-white cursor-pointer bg-gray-200' + (props.currentPage == v ? ' bg-aqua font-medium text-white' : '')}
                                onClick={() => pageClicked(v)}
                            >{v + 1}
                            </div>
                        ) : null
                }

                {
                    props.numberOfPages > MAX_PAGES_TO_SHOW && props.currentPage < (props.numberOfPages - 5) ?
                        <div className="flex">
                            <div
                                className="flex items-center px-1 mr-1 md:px-4 md:py-2 md:mx-1 rounded-sm md:rounded-md bg-gray-200"
                            >...
                            </div>
                            <div
                                className="flex items-center px-1 mr-1 md:px-4 md:py-2 md:mx-1 rounded-sm md:rounded-md hover:bg-irises hover:text-white cursor-pointer bg-gray-200"
                                onClick={() => pageClicked(props.numberOfPages - 1)}
                            >{props.numberOfPages}
                            </div>
                        </div>
                        : null
                }

                <div
                    className="flex items-center px-1 mr-1 md:px-4 md:py-2 md:mx-1 rounded-sm md:rounded-md hover:bg-irises hover:text-white cursor-pointer bg-gray-200"
                    onClick={() => pageClicked(props.currentPage + 1)}
                >
                    <FontAwesomeIcon className="h-2 w-2 md:h-5 md:w-5" icon={faAngleRight} />
                </div>
            </div>
        </div>
    )
}