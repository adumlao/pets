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
      <label htmlFor="body">What's on your mind?</label>
      <textarea
        rows = "5"
        cols = "50"
        name="body"
        id="body"
        value={body}
        onChange={handleChange} />
      <label htmlFor="description">Description</label>
      <input
        onChange={handleChange}
        type="text"
        name="description"
        value={description}
        id="description"
         />
      <button
        onClick={handleSubmit}
        type="submit">Post</button>
    </form>
  )
}
