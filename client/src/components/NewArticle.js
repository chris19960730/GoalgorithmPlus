/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

import Navigation from './Navigation';
import ReactMarkdown from 'react-markdown';
import MultiSelect from 'react-multi-select-component';
import './NewArticle.css';

function NewArticle() {
  const [selected, setSelected] = useState([]);
  const history = useHistory();
  const [newArticleFormData, setNewArticleFormData] = useState({
    title: '',
    tags: [],
    description: '',
    content: '',
    user_id: '',
    user_name: '',
  });
  const onChangeEventListener = (e) => {
    setNewArticleFormData({
      ...newArticleFormData,
      [e.target.name]: e.target.value,
    });
  };

  const getUserInfo = async (token) => {
    const res = await fetch('/currentUser?id=' + token);
    const userInfo = await res.json();
    setNewArticleFormData({
      ...newArticleFormData,
      user_id: userInfo._id,
      user_name: userInfo.username,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('current_user');
    if (token) {
      getUserInfo(token);
    } else {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    const tags = selected.map((tag) => {
      return colors[tag.value];
    });
    setNewArticleFormData({
      ...newArticleFormData,
      tags: tags,
    });
  }, [selected]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    postNewArticleData();
  };
  const postNewArticleData = async () => {
    fetch('/articles/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticleFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          Swal.fire({
            icon: 'success',
            title: 'Tada',
            text: 'Successfully created an article!',
          });
          history.push('/Articles');
        } else {
          console.log('Something wrong');
        }
      })
      .catch(() => {
        console.error('Error');
      });
  };

  const colors = {
    Array: { color: '#183B61', name: 'Array' },
    'Hash Table': { color: '#4F1F58', name: 'Hash Table' },
    'Data Structure': { color: '#4F010C', name: 'Data Structure' },
    Math: { color: '#004F10', name: 'Math' },
    'Two Pointers': { color: '#4C5240', name: 'Two Pointers' },
    'Divide and Conquer': { color: '#040326', name: 'Divide and Conquer' },
    Greedy: { color: '#404571', name: 'Greedy' },
    Design: { color: '#7F6807', name: 'Design' },
    Sort: { color: '#56776c', name: 'Sort' },
    Database: { color: '#864000', name: 'Database' },
    SQL: { color: '#301b3f', name: 'SQL' },
    'Sliding Window': { color: '#301b3f', name: 'Sliding Window' },
    JavaScript: { color: '#4a47a3', name: 'JavaScript' },
    'Computer System': { color: '#314e52', name: 'Computer System' },
    Python: { color: '#393e46', name: 'Python' },
    'Programming Language': { color: '#222831', name: 'Programming Language' },
  };
  const options = [
    { label: 'Array', value: 'Array' },
    { label: 'Hash Table', value: 'Hash Table' },
    {
      label: 'Data Structure',
      value: 'Data Structure',
    },
    { label: 'Math', value: 'Math' },
    { label: 'Two Pointers', value: 'Two Pointers' },
    {
      label: 'Divide and Conquer',
      value: 'Divide and Conquer',
    },
    { label: 'Greedy', value: 'Greedy' },
    { label: 'Design', value: 'Design' },
    { label: 'Sort', value: 'Sort' },
    { label: 'Database', value: 'Database' },
    { label: 'SQL', value: 'SQL' },
    {
      label: 'Sliding Window',
      value: 'Sliding Window',
    },
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'Computer System', value: 'Computer System' },
    { label: 'Python', value: 'Python' },
    {
      label: 'Programming Language',
      value: 'Programming Language',
    },
  ];

  return (
    <div role="main">
      <Navigation />

      <div className="container new-article-container">
        <h1 className="title">New Article</h1>
        <div className="row mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="title">
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  name="title"
                  onChange={onChangeEventListener}
                  placeholder="Please input the title of the article..."
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="tags">
              <Form.Label column sm="2">
                Tags
              </Form.Label>
              <Col sm="10">
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  hasSelectAll={false}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Please input the description of the article..."
                name="description"
                onChange={onChangeEventListener}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Please input the full article..."
                name="content"
                onChange={onChangeEventListener}
              />
            </Form.Group>
            <Button type="submit" variant="outline-success mt-3 create-btn">
              Create Article
            </Button>
          </Form>
          <div className="col mt-5">
            <h2 className="preview"> Content Preview</h2>
            <ReactMarkdown>{newArticleFormData.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArticle;
