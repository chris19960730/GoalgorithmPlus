/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navigation from './Navigation';
import Tag from './Tag';
import ReactMarkdown from 'react-markdown';
import Toggle from 'react-toggle';
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
  const getArticle = async () => {
    const resRaw = await fetch('/articles/' + articleID);
    const res = await resRaw.json();
    setArticle(res);
  };
  useEffect(() => {
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
    <Tag key={i} color={color} tag={name} />
  );

  return (
    <>
      <Navigation />
      <div className="container ">
        <Card>
          <Card.Header>{article.title}</Card.Header>
          <Card.Body>
            {renderTags()}
            <blockquote className="blockquote mb-0">
              <ReactMarkdown>{article.content}</ReactMarkdown>
              <footer className="blockquote-footer">
                Created by <cite title="Source Title">{article.user_name}</cite>
              </footer>
            </blockquote>
          </Card.Body>
          <Card.Footer className="text-muted">
            Created at{' '}
            <cite title="Source Title">
              {' '}
              {new Date(article.created_at).toString().substring(0, 21)}
            </cite>
          </Card.Footer>
          <label>
            <h3 className="votes">
              <span>❤️</span>
              {article.votes}
            </h3>
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
      </div>
    </>
  );
}

export default ArticleDetail;
