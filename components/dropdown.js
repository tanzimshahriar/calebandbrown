import { useState, useEffect } from "react";
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = (props) => {
    const [expand, setExpand] = useState(false)

    const selectFromDropdown = (key) => {
        setExpand(false);
        props.click(key);
    }

    const getOptionName = (s) => {
        if (s.includes("High")) {
            let newStr = s.split(' High')[0]
            return { name: newStr, icon: faSortAmountUp }
        } else {
            let newStr = s.split(' Low');
            return { name: newStr, icon: faSortAmountDown }
        }
    }

    return (
        <div>
            <div className="flex flex-col mx-1 sm:mx-4">
                <div onClick={() => setExpand(!expand)} className="flex items-center justify-center md:gap-x-1 px-2 sm:px-4 text-xs sm:text-sm py-1 shadow-sm bg-gray-100 rounded-md cursor-pointer">
                    <div>
                        {getOptionName(props.values[props.val]).name}
                    </div>
                    <FontAwesomeIcon className="ml-1 h-3 w-3" icon={getOptionName(props.values[props.val]).icon} />
                </div>
                <div className="shadow-md bg-gray-100 rounded-md cursor-pointer absolute z-10 mt-7 sm:mt-8">
                    {expand ?
                        [...props.values].map((v, key) => (
                            <div key={key} onClick={() => selectFromDropdown(key)} className={'flex items-center justify-between px-2 sm:px-4 text-xs sm:text-sm py-1 hover:bg-irises hover:text-white rounded-md' + (key == props.val ? ' bg-aqua text-white' : '')}>
                                <div>
                                    {getOptionName(v).name}
                                </div>
                                <FontAwesomeIcon className="ml-1 h-3 w-3" icon={getOptionName(v).icon} />
                            </div>
                        ))
                        : null}
                </div>


            </div>
        </div>
    );
};

export default Dropdown;