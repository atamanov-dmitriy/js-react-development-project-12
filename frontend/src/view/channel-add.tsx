import { PlusSquare } from "react-bootstrap-icons";
import { useAppDispatch } from "../@redux/hooks";
import { channelsActions } from "../model/channels/channels.slice";
import { useTranslation } from "react-i18next";

const ChannelAdd = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(channelsActions.setIsModalAddOpen(true));
  };
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t("page-index.headingChannelAdd")}</b>
      <button
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={handleClick}
      >
        <PlusSquare width={20} height={20} fill="currentColor" />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
};

export { ChannelAdd };
