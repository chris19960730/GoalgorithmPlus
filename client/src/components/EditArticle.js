/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router';
import Swal from 'sweetalert2';

import Navigation from './Navigation';
import ReactMarkdown from 'react-markdown';
import MultiSelect from 'react-multi-select-component';
import './NewArticle.css';

function EditArticle() {
  const location = useLocation();

  const articleID = location.state;

  const [selected, setSelected] = useState([]);
  const history = useHistory();
  const [editArticleFormData, setEditArticleFormData] = useState({
    title: '',
    tags: [],
    description: '',
    content: '',
    user_id: '',
    user_name: '',
  });
  const onChangeEventListener = (e) => {
    setEditArticleFormData({
      ...editArticleFormData,
      [e.target.name]: e.target.value,
    });
  };

  const getArticle = async () => {
    const resRaw = await fetch('/articles/' + articleID);
    const res = await resRaw.json();

    setEditArticleFormData(res);
  };
  useEffect(() => {
    getArticle();
  }, []);

  useEffect(() => {
    const tags = selected.map((tag) => {
      return colors[tag.value];
    });
    setEditArticleFormData({
      ...editArticleFormData,
      tags: tags,
    });
  }, [selected]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    postEditArticleData();
  };
  const postEditArticleData = async () => {
    fetch('/updateArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editArticleFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          Swal.fire({
            icon: 'success',
            title: 'Awesome!',
            text: 'Successfully updated an article!',
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
    Array: { color: '#9ede73', name: 'Array' },
    'Hash Table': { color: '#f7ea00', name: 'Hash Table' },
    'Data Structure': { color: '#e48900', name: 'Data Structure' },
    Math: { color: '#be0000', name: 'Math' },
    'Two Pointers': { color: '#5b6d5b', name: 'Two Pointers' },
    'Divide and Conquer': { color: '#9ddfd3', name: 'Divide and Conquer' },
    Greedy: { color: '#31326f', name: 'Greedy' },
    Design: { color: '#2b2e4a', name: 'Design' },
    Sort: { color: '#903749', name: 'Sort' },
    Database: { color: '#53354a', name: 'Database' },
    SQL: { color: '#822659', name: 'SQL' },
    'Sliding Window': { color: '#e4bad4', name: 'Sliding Window' },
    JavaScript: { color: '#433520', name: 'JavaScript' },
    'Computer System': { color: '#025955', name: 'Computer System' },
    Python: { color: '#00917c', name: 'Python' },
    'Programming Language': { color: '#85603f', name: 'Programming Language' },
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
    <>
      <Navigation />

      <div className="container new-article-container ">
        <h1>Edit Article</h1>
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
                value={editArticleFormData.title}
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
                labelledBy="Select"
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
              value={editArticleFormData.description}
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
              value={editArticleFormData.content}
            />
          </Form.Group>
          <Button type="submit" variant="outline-success mt-3">
            Update Article
          </Button>
        </Form>
        <div className="container mt-5">
          <h3> Content Preview</h3>
          <ReactMarkdown>{editArticleFormData.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default EditArticle;
