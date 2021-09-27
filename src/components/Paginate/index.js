import './index.css'
import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';

 function Paginate (props) {
    const{pageCount, onChangePage} = props

    const[ PageNumber, setPageNumber] = useState(0)

    const changePage = ({selected}) => {
        setPageNumber(selected)
        onChangePage(selected)
    }

    return(
        <>
         <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'non-active-button'}
            activeClassName={'active-btn'}
         />
         </>
    )
}

export default Paginate