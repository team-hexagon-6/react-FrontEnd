import { useState } from "react";
import { Pagination } from "react-bootstrap";

// totalItems = 1000
// pageSize = 10
// currentPage = 1
// totalPages = 100
// skip = 0
// take = 10
// take == pageSize


const Paginate = ({skip,take,setSkip,totalItems}) => {


  return (
    <>
      {totalItems<=take ? <></>:(
        <Pagination>
          <Pagination.First onClick={() => setSkip(0)} disabled={skip<=0}/>
          <Pagination.Prev onClick={() => setSkip(skip-take > 0 ? skip-take : 0)} disabled={skip<=0}  />
          {skip>=take && <Pagination.Item onClick={() => setSkip(skip-take > 0 ? skip-take : 0)}>{Math.ceil(skip/take )}</Pagination.Item>}
          <Pagination.Item active={true} onClick={() => setSkip(skip)}>{Math.ceil(skip/take+1)}</Pagination.Item>
          {skip+take < totalItems && <Pagination.Item  onClick={() => setSkip(skip+take<totalItems?skip+take:skip)}>{Math.ceil(skip/take+2)}</Pagination.Item>}
          <Pagination.Next onClick={() => setSkip(skip+take<totalItems?skip+take:skip)} disabled={skip + take >= totalItems}/>
          <Pagination.Last onClick={() => setSkip(totalItems-take)} disabled={skip +take >= totalItems}/>
        </Pagination>  
      )}
    </>);
};

export default Paginate;
