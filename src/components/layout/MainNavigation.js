import { Link } from 'react-router-dom'

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <h1>Instagram</h1>
      <Link to='/signup'>Sign-up</Link>
    </header>
  );
}
export default MainNavigation;
