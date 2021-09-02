import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source, badgeColor } = props;
  return (
    <div className='my-3'>
      <div className='card'>
        <div className='d-flex justify-content-end position-absolute  end-0'>
          <span className={`   badge rounded-pill ${badgeColor}`}>{source}</span>
        </div>
        <img
          src={
            imageUrl ||
            'https://images.firstpost.com/wp-content/uploads/2021/08/screencapture-pbs-twimg-media-E-Cf8xtXoAMAxLq-2021-08-31-14_55_09-1.jpg'
          }
          className='card-img-top'
          alt='...'
        />
        <div className='card-body'>
          <h5 className='card-title'>{title.length >= 45 ? title.slice(0, 80) + '...' : title}</h5>
          <p className='card-text'>
            {(description.length >= 90 ? description.slice(0, 250) + '...' : description) || 'No description Found'}{' '}
          </p>
          <p className='card-text'>
            <small className='text-muted'>
              By {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} target='_blank' rel='noreferrer' className='btn btn-sm btn-dark'>
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
