import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
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
  const style = {
    backgroundColor: '#333333',
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
              <button
                className="btn btn-primary me-1"
                aria-label="View"
                // style={style}
                onClick={onView}
                data-tip
                data-for="view"
              >
                <i class="fas fa-expand"></i>
              </button>
            </div>
            <div className="col-6"></div>

            {editable ? (
              <div className="col-3">
                {/* <Button variant="outline-info me-2" onClick={onClickEdit}>
                  Edit
                </Button> */}
                <button
                  className="btn btn-primary me-1"
                  aria-label="Edit"
                  style={style}
                  onClick={onClickEdit}
                  data-tip
                  data-for="edit"
                >
                  <i className="fas fa-edit"></i>
                </button>

                <button
                  className="btn btn-primary"
                  aria-label="Delete"
                  style={style}
                  onClick={onClickDelete}
                  data-tip
                  data-for="delete"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <ReactTooltip id="view" type="dark">
                  <span>View the full article</span>
                </ReactTooltip>
                <ReactTooltip id="delete" type="error">
                  <span>Delete the article</span>
                </ReactTooltip>
                <ReactTooltip id="edit" type="info">
                  <span>Edit the article</span>
                </ReactTooltip>
                {/* <Button variant="outline-danger" onClick={onClickDelete}>
                  Delete
                </Button> */}
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
