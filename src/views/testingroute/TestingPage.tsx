import React,{ useEffect,useState} from 'react';
import Loader from '../../components/loader/loader';
import Paginate from '../../components/pagination/paginate';

const TestingPage =()=>{
    const [skip,setSkip] = useState(0);
    const [take,setTake] = useState(2);
    const [totalItems,setTotalItems] = useState(24);
    

    return (
        <>
        <div>
            <div>
                <h1>pagination testing </h1>
                <h2>skip :{skip}</h2>
                <h2>take :{take}</h2>
                <h2>totalItems :{totalItems}</h2>
                <h2>page number :{Math.ceil(skip/take+1)}</h2>
            </div>

            <div>
                {/* <Paginate
                    skip={skip}
                    take={take}
                    setSkip={setSkip}
                    totalItems={totalItems}
                /> */}
                <Loader/>
            </div>
        </div>
        </>
    )
}

export default TestingPage;

