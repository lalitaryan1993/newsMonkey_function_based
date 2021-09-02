import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${
      props.apiKey
    }&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className='text-center' style={{ margin: '30px 0', marginTop: '90px' }}>
        NewsMonkey - Top {`${capitalizeFirstLetter(props.category)}`} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container my-3'>
          <div className='row'>
            {articles.map((article) => {
              return (
                <div className='col-md-4' key={article.url}>
                  <NewsItem
                    newsUrl={article.url}
                    title={article.title || ''}
                    description={article.description || ''}
                    imageUrl={article.urlToImage}
                    author={article.author || 'Unknown'}
                    date={article.publishedAt}
                    source={article.source.name}
                    badgeColor={props.badgeColor}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className='container'>
          <div className='row'>
            <nav aria-label='Page navigation example'>
              <ul className='pagination justify-content-between'>
                <li className='page-item '>
                  <button
                    type='button'
                    disabled={page <= 1}
                    className='btn btn-sm btn-dark'
                    onClick={handlePrevClick}
                  >
                    &larr; Previous
                  </button>
                </li>

                <li className='page-item '>
                  <button
                    disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
                    type='button'
                    className='btn btn-sm btn-dark'
                    href='#'
                    onClick={handleNextClick}
                  >
                    Next &rarr;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 12,
  category: 'general',
  badgeColor: 'bg-primary',
};

News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  badgeColor: PropTypes.string,
};

export default News;
