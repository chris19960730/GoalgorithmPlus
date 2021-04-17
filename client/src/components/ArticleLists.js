/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';

import Article from './Article';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import './ArticleLists.css';

function ArticleLists({ perPage, domain }) {
  const [articles, setArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tagFilter, setTagFilter] = useState('');
  const [searchTempFilter, setSearchTempFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const history = useHistory();
  const getAllArticles = async (
    start,
    itemPerPage,
    tagFilter,
    searchFilter
  ) => {
    const resRaw = await fetch(
      '/allArticles?start=' +
        start +
        '&itemPerPage=' +
        itemPerPage +
        '&tagFilter=' +
        tagFilter +
        '&searchFilter=' +
        searchFilter
    );
    const res = await resRaw.json();
    setArticles(res);
  };

  const getMyArticles = async (start, itemPerPage, tagFilter, searchFilter) => {
    const resRaw = await fetch(
      '/myArticles?start=' +
        start +
        '&itemPerPage=' +
        itemPerPage +
        '&userId=' +
        localStorage.getItem('current_user') +
        '&tagFilter=' +
        tagFilter +
        '&searchFilter=' +
        searchFilter
    );
    const res = await resRaw.json();
    setArticles(res);
  };

  const getArticleCount = async (tagFilter, searchFilter) => {
    const resRaw = await fetch(
      '/articlesCount?tagFilter=' + tagFilter + '&searchFilter=' + searchFilter
    );
    const count = await resRaw.json();
    setArticlesCount(count);
  };

  const getMyArticleCount = async (tagFilter, searchFilter) => {
    const resRaw = await fetch(
      '/myArticlesCount?userId=' +
        localStorage.getItem('current_user') +
        '&tagFilter=' +
        tagFilter +
        '&searchFilter=' +
        searchFilter
    );
    const count = await resRaw.json();
    setArticlesCount(count);
  };
  useEffect(() => {
    const token = localStorage.getItem('current_user');
    if (token) {
      setCurrentUser(token);
    } else {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    if (domain === 'personal') {
      getMyArticles(0, perPage, tagFilter, searchFilter);
      getMyArticleCount(tagFilter, searchFilter);
    } else {
      getAllArticles(0, perPage, tagFilter, searchFilter);
      getArticleCount(tagFilter, searchFilter);
    }
  }, [currentUser, tagFilter, searchFilter]);

  const viewArticle = (id) => {
    history.push('/articleDetails/', id);
  };

  const EditArticle = (id) => {
    history.push('/editArticle/', id);
  };

  const deleteArticle = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch('/deleteOneArticle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              articleId: id,
            }),
          })
            .then((res) => res.json())
            .then(() => {
              window.location.reload();
            })
            .catch(() => {
              console.log('Something wrong');
            });
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your article has been deleted.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your article is safe :)',
            'error'
          );
        }
      });
  };

  const renderArticle = (article) => {
    return (
      <Article
        key={article._id}
        tags={article.tags}
        title={article.title}
        description={article.description}
        onView={() => {
          viewArticle(article._id);
        }}
        onClickTag={(tag) => {
          return () => {
            Swal.fire(
              'Filtered by ' + tag.name,
              'Successfully filtered!',
              'success'
            );
            setTagFilter(tag.name);
          };
        }}
        editable={article.user_id === currentUser}
        onClickEdit={() => {
          EditArticle(article._id);
        }}
        onClickDelete={() => {
          deleteArticle(article._id);
        }}
      />
    );
  };
  const renderArticles = () => {
    return articles.map((article) => {
      return renderArticle(article);
    });
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    const start = perPage * (pageNumber - 1);
    if (domain === 'personal') {
      getMyArticles(start, perPage, tagFilter, searchFilter);
    } else {
      getAllArticles(start, perPage, tagFilter, searchFilter);
    }
  };

  const resetSearchFilter = () => {
    setSearchFilter('');
  };
  const resetTagFilter = () => {
    setTagFilter('');
  };

  return (
    <>
      <Navigation />
      <div className="container mb-5">
        <div className="row justify-content-center my-3 ">
          <SearchBar
            placeholder="Search here"
            onChange={setSearchTempFilter}
            onSearchClick={() => {
              Swal.fire(
                'Search completed',
                'Successfully filtered!',
                'success'
              );
              setSearchFilter(searchTempFilter);
            }}
            onEnter={() => {
              Swal.fire(
                'Search completed',
                'Successfully filtered!',
                'success'
              );
              setSearchFilter(searchTempFilter);
            }}
          />
        </div>
      </div>

      <div className="articlelists-container">
        <div className="column">
          {domain === 'personal' ? <h1>My Articles</h1> : <h1>All Articles</h1>}
          <div className="d-flex my-1">
            {tagFilter ? (
              <div className="d-flex align-items-md-center me-2">
                <h5>
                  <span class="badge bg-dark">{tagFilter}</span>
                </h5>

                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  onClick={resetTagFilter}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : null}
            {searchFilter ? (
              <div className="d-flex align-items-md-center">
                <h5>
                  <span class="badge bg-dark">{searchFilter}</span>
                </h5>

                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  onClick={resetSearchFilter}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {renderArticles()}
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div className="col-lg-3 "></div>
          <div className="col-lg-3">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={perPage}
              totalItemsCount={articlesCount}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
              hideDisabled
              hideFirstLastPages
            />
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </>
  );
}

ArticleLists.propTypes = {
  perPage: PropTypes.number.isRequired,
  domain: PropTypes.string.isRequired,
};

export default ArticleLists;
