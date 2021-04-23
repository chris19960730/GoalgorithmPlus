import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import './Article.css';
import Tag from './Tag';
import Description from './Description';

function Article({
  id,
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
          <div data-tip data-for={'tag' + id}>
            {renderTags()}
            <ReactTooltip id={'tag' + id} type="dark">
              <span>Click to filter by tag</span>
            </ReactTooltip>
          </div>
          <h2 className="article__title">{title}</h2>
          <Description description={description} />

          <div className="row mt-4 justify-content-between">
            <div className="col-3">
              <button
                className="btn btn-primary me-1 viewBtn"
                aria-label="View"
                onClick={onView}
                data-tip
                data-for={'view' + id}
              >
                View more
              </button>
            </div>

            {editable ? (
              <div className="col-3 edit-btn-group">
                <button
                  className="btn btn-primary me-1 editBtn"
                  aria-label="Edit"
                  onClick={onClickEdit}
                  data-tip
                  data-for={'edit' + id}
                >
                  <i className="fas fa-edit"></i>
                </button>

                <button
                  className="btn btn-primary deleteBtn"
                  aria-label="Delete"
                  onClick={onClickDelete}
                  data-tip
                  data-for={'delete' + id}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <ReactTooltip id={'view' + id} type="dark">
                  <span>View the full article</span>
                </ReactTooltip>
                <ReactTooltip id={'delete' + id} type="error">
                  <span>Delete the article</span>
                </ReactTooltip>
                <ReactTooltip id={'edit' + id} type="info">
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
  id: PropTypes.string.isRequired,
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
