import type { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Router } from "../shared/consts";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to={Router.ROOT}>
            Hexlet Chat
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export { MainLayout };
