import React from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';
import { useState, useEffect } from 'react';

const title = "Sorting Articles";

function App({articles}) {
   
    // const setSortedByUp = articles.sort((a,b) => (b.upvotes > a.upvotes) ? 1 : ((a.upvotes > b.upvotes) ? -1 : 0))
    const [sortedArticles, setSortedArticles] = useState(articles)

    
    useEffect(() => {
        sortedByUpvotes()
    })

    const sortedByUpvotes = () => {
        const arr = [...sortedArticles]
        setSortedArticles(arr.sort((a,b) => (b.upvotes > a.upvotes) ? 1 : ((a.upvotes > b.upvotes) ? -1 : 0)))
    }

    const sortedByDate = () => {
        const arr = [...sortedArticles]
        setSortedArticles( arr.sort((a,b) => (b.date > a.date) ? 1 : ((a.date > b.date) ? -1 : 0)))
    }


    

    

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button onClick={sortedByUpvotes} data-testid="most-upvoted-link" className="small">Most Upvoted</button>
                <button onClick={sortedByDate} data-testid="most-recent-link" className="small">Most Recent</button>
            </div>
            <Articles articles={sortedArticles}/>
        </div>
    );

}

export default App;
