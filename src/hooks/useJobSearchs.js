/* import React, { useState } from 'react';
import { gqlquery } from '../api';

const useJobSearchs = () => {
  
    const [searchResult , setSearchResult ] = useState([]);
    // setSearchResult(["hello"]);
    console.log("searchResult hooks after state", searchResult);

    const jobSearchResult = (QUERY) => {

        gqlquery(QUERY, null)
        .then((res) => res.json())
        .then((datas) => setSearchResult(datas))
        // console.log("searchResult hooks inside job search result", searchResult);
    };
    setTimeout( jobSearchResult , 500);

  console.log("searchResult hooks outside", searchResult);
    return {
        jobSearchResult,
        searchResult,
      
    }
};
  
export default useJobSearchs; */