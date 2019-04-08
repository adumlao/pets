import React from 'react';

export default (props) => {
  const {
    body,
    description,
    handleChange,
    handleSubmit
  } = props;

  return (
    <form>
      <label htmlFor="name">What's on your mind?</label>
      <textarea
        rows = "5"
        cols = "50"
        name="body"
        id="name"
        value={body}
        onChange={handleChange} />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={description}
        id="description"
        onChange={handleChange} />
      <button
        onClick={handleSubmit}
        type="submit">Post</button>
    </form>
  )
}
