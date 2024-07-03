import classNames from "classnames";

import styles from "./Body.module.css";

type BodyPropsType = {
  children: JSX.Element | null;
};

const Body = ({ children = null }: BodyPropsType) => (
  <main
    className={classNames(
      styles.body
    )}
  >
    {children}
  </main>
);

export default Body;
