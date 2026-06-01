import { useTranslation } from "react-i18next";
import { useAppSelector } from "../@redux/hooks";
import { useFetchMessagesQuery } from "../model/messages/messages.api";

const ChannelInfo = () => {
  const { data: messages } = useFetchMessagesQuery();

  const selectedChannel = useAppSelector(
    (state) => state.channels.selectedChannel,
  );

  const { t } = useTranslation();

  const messagesQty = messages?.filter(
    ({ channelId }) => channelId === selectedChannel?.id,
  ).length;

  const name = selectedChannel?.name ?? "";

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${name}`}</b>
      </p>
      <span className="text-muted">
        {t("page-index.messagesQty.count", { count: messagesQty })}
      </span>
    </div>
  );
};

export { ChannelInfo };
