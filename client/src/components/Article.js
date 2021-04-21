import React from 'react';
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

          <div className="row mt-4 justify-content-between">
            <div className="col-3">
              <button
                className="btn btn-primary me-1 viewBtn"
                aria-label="View"
                // style={style}
                onClick={onView}
                data-tip
                data-for="view"
              >
                View more
              </button>
            </div>

            {editable ? (
              <div className="col-3 edit-btn-group">
                <button
                  className="btn btn-primary me-1 editBtn"
                  aria-label="Edit"
                  // style={style}
                  onClick={onClickEdit}
                  data-tip
                  data-for="edit"
                >
                  <i className="fas fa-edit"></i>
                </button>

                <button
                  className="btn btn-primary deleteBtn"
                  aria-label="Delete"
                  // style={style}
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
