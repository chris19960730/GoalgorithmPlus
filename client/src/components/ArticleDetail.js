/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navigation from './Navigation';
import Tag from './Tag';
import Footer from './Footer';
import ReactMarkdown from 'react-markdown';
import Toggle from 'react-toggle';
import HashLoader from 'react-spinners/HashLoader';
import 'react-toggle/style.css';
import './ArticleDetail.css';

function ArticleDetail() {
  const location = useLocation();
  const resettingRef = useRef(false);

  const articleID = location.state;
  const [article, setArticle] = useState({
    title: '',
    tags: [],
    description: '',
    content: '',
    votes: 0,
  });
  const [upvoted, setUpvoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const getArticle = async () => {
    const resRaw = await fetch('/articles/' + articleID);
    const res = await resRaw.json();
    setLoading(false);
    setArticle(res);
  };
  useEffect(() => {
    setLoading(true);
    getArticle();
  }, []);

  useEffect(() => {
    checkIfUpvoted();
  }, []);
  useEffect(() => {
    if (resettingRef.current) {
      resettingRef.current = false;
      if (upvoted) {
        setUpvoted(false);
        RemoveUpvoteLists();
        updateArticleVotes();
      } else {
        setUpvoted(true);
        insertUpvoteLists();
        updateArticleVotes();
      }
    }
  }, [article]);

  const updateArticleVotes = async () => {
    fetch('/updateArticleVotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Tada',
          text: 'Updated!',
        });
      })
      .catch(() => {
        console.log('Something wrong');
      });
  };

  const checkIfUpvoted = async () => {
    const resRaw = await fetch(
      '/upvoteLists?userId=' +
        localStorage.getItem('current_user') +
        '&articleId=' +
        articleID
    );
    const res = await resRaw.json();

    setUpvoted(res.status);
  };

  const RemoveUpvoteLists = async () => {
    fetch('/removeUpvoteLists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('current_user'),
        articleId: articleID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.log('Something wrong');
      });
  };
  const insertUpvoteLists = async () => {
    fetch('/upvoteLists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('current_user'),
        articleId: articleID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.log('Something wrong');
      });
  };

  const renderTags = () => {
    const tags = article.tags;
    return tags.map((tag, i) => {
      return renderTag(tag.color, tag.name, i);
    });
  };
  const renderTag = (color, name, i) => (
    <Tag key={i} color={color} tag={name} showToolTip={false} />
  );

  return (
    <div role="main">
      <Navigation />
      <div className="container my-5">
        {loading ? (
          <div
            className="row flex justify-content-center align-items-center"
            style={{ minHeight: '300px' }}
          >
            <HashLoader loading={loading} size={50} />
          </div>
        ) : (
          <Card>
            <h1 className="card-header">{article.title}</h1>
            <Card.Body>
              {renderTags()}
              <blockquote className="blockquote mb-0">
                <ReactMarkdown>{article.content}</ReactMarkdown>
                <div className="blockquote-footer mt-5">
                  Created by{' '}
                  <cite title="Source Title">{article.user_name}</cite>
                </div>
              </blockquote>
            </Card.Body>
            <Card.Footer className="text-muted">
              Created at{' '}
              <cite title="Source Title">
                {' '}
                {new Date(article.created_at).toString().substring(0, 21)}
              </cite>
            </Card.Footer>
            <label className="container">
              <h2 className="votes">
                <span className="me-2">
                  <i className="fab fa-gratipay"></i>
                </span>
                <span>{article.votes}</span>
              </h2>
              <Toggle
                checked={upvoted}
                className="custom-classname"
                onChange={() => {
                  if (upvoted) {
                    resettingRef.current = true;
                    setArticle({
                      ...article,
                      votes: article.votes - 1,
                    });
                  } else {
                    resettingRef.current = true;
                    setArticle({
                      ...article,
                      votes: article.votes + 1,
                    });
                    console.log(article);
                  }
                }}
              />
            </label>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ArticleDetail;
