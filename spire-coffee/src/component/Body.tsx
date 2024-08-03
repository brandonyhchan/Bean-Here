import classNames from "classnames";

import styles from "./Body.module.scss";

type BodyPropsType = {
  children: JSX.Element | null;
};

const Body = ({ children = null }: BodyPropsType) => (
  <main
    className={classNames(
      styles.main
    )}
  >
    {children}
  </main>
);

export default Body;
