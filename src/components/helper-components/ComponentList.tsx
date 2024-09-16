import { Fragment, ReactNode } from "react";

type IComponentList = {
  count: number;
  children: ReactNode;
};

const ComponentList: React.FC<IComponentList> = ({ count, children }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Fragment key={index}>{children}</Fragment>
      ))}
    </>
  );
};

export default ComponentList;
