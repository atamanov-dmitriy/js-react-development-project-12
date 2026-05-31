import type { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Router } from "../shared/consts";
import { Button, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../@redux/hooks";
import { authActions } from "../features/model/auth/auth.slice";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const isAuthorized = useAppSelector((state) => state.auth.token) !== null;

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(authActions.signOut());
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Link className="navbar-brand" to={Router.ROOT}>
            Hexlet Chat
          </Link>
          {isAuthorized && <Button onClick={handleClick}>Выйти</Button>}
        </Container>
      </nav>
      {children}
    </div>
  );
};

export { MainLayout };
