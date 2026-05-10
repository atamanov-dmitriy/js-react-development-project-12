import { Link } from "react-router-dom";
import { Router } from "../shared/consts";

const PageNotFound = () => {
  return (
    <div className="text-center">
      <img
        alt="Страница не найдена"
        className="img-fluid h-25 p-3"
        src="/public/404-D_FLHmTM.png"
      />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти <Link to={Router.ROOT}>на главную страницу</Link>
      </p>
    </div>
  );
};

export { PageNotFound };
