import React from 'react';

export default (props) => {
  const {
    name,
    email,
    password,
    handleChange,
    handleSubmit,
  } = props;
  return (
    <div>
      <h2>RegisterForm</h2>
      <form>
        <label htmlFor="email">Email </label>
        <input
          type="text"
          onChange={handleChange}
          name="email"
          id="email"
          value={email} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          id="password"
          value={password} />
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          onChange={handleChange}
          name="name"
          value={name} />
        <button type="submit" onClick={handleSubmit}>Register!</button>
      </form>
    </div>
  )
}
