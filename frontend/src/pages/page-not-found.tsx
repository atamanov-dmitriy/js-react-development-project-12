import { Link } from "react-router-dom";
import { Router } from "../shared/consts";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t("page-not-found.heading")}
        className="img-fluid h-25 p-3"
        src="/public/404-D_FLHmTM.png"
      />
      <h1 className="h4 text-muted">{t("page-not-found.heading")}</h1>
      <p className="text-muted">
        {t("page-not-found.paragraph")}{" "}
        <Link to={Router.ROOT}>{t("page-not-found.link")}</Link>
      </p>
    </div>
  );
};

export { PageNotFound };
