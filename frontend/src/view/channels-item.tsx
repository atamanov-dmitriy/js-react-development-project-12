import { ButtonGroup, Dropdown } from "react-bootstrap";
import type { Channel } from "../model/channels/channels.types";
import type { FC } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../@redux/hooks";
import { channelsActions } from "../model/channels/channels.slice";
import { useTranslation } from "react-i18next";

interface ChannelsRemovableItemProps {
  channel: Channel;
}

const buttonClass = clsx("w-100", "rounded-0", "text-start", "btn");

const ChannelsItem: FC<ChannelsRemovableItemProps> = ({ channel }) => {
  const { id, name, removable } = channel;
  const dispatch = useAppDispatch();

  const selectedChannel = useAppSelector(
    (state) => state.channels.selectedChannel,
  );
  const { t } = useTranslation();

  const handleSelect = () => {
    dispatch(channelsActions.select(channel));
  };

  const handleRename = () => {
    dispatch(channelsActions.setIsModalRenameOpen({ isOpen: true, channel }));
  };

  const handleDelete = () => {
    dispatch(channelsActions.setIsModalDeleteOpen({ isOpen: true, id }));
  };

  const isSelected = selectedChannel?.id === id;

  if (removable === false) {
    return (
      <button
        type="button"
        className={clsx(buttonClass, isSelected && "btn-secondary")}
        onClick={handleSelect}
      >
        <span className="me-1">#</span>
        {name}
      </button>
    );
  }

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <button
        type="button"
        className={clsx(buttonClass, isSelected && "btn-secondary")}
        onClick={handleSelect}
      >
        <span className="me-1">#</span>
        {name}
      </button>
      <Dropdown.Toggle
        split
        id="dropdown-split-basic"
        variant={isSelected ? "secondary" : "light"}
        aria-label={"channelManagement"}
      >
        <span className="visually-hidden">
          {t("page-index.channelsItemMenu")}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleDelete}>
          {t("page-index.channelsItemDelete")}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRename}>
          {t("page-index.channelsItemRename")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { ChannelsItem };
