import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './Article.css';
import Tag from './Tag';
import Description from './Description';

function Article({
  tags,
  title,
  description,
  onView,
  onClickTag,
  editable,
  onClickEdit,
  onClickDelete,
}) {
  const renderTag = (color, name, onClick, i) => (
    <Tag key={i} color={color} tag={name} onClick={onClick} />
  );
  const renderTags = () => {
    return tags.map((tag, i) => {
      return renderTag(tag.color, tag.name, onClickTag(tag), i);
    });
  };

  return (
    <>
      <div className="column">
        <article className="article">
          {renderTags()}
          <h2 className="article__title">{title}</h2>
          <Description description={description} />

          <div className="row">
            <div className="col-3">
              <Button variant="outline-dark" onClick={onView}>
                View More
              </Button>
            </div>
            <div className="col-6"></div>

            {editable ? (
              <div className="col-3">
                <Button variant="outline-info me-2" onClick={onClickEdit}>
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={onClickDelete}>
                  Delete
                </Button>
              </div>
            ) : (
              <div className="col-3"></div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}

Article.propTypes = {
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func,
  onView: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickTag: PropTypes.func,
};

export default Article;
