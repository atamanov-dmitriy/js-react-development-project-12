import { useAppSelector } from "../../@redux/hooks";
import { useFetchMessagesQuery } from "../model/messages/messages.api";

const MessagesList = () => {
  const { data: messages } = useFetchMessagesQuery();
  const selectedChannel = useAppSelector(
    (state) => state.channels.selectedChannel,
  );

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        ?.filter(({ channelId }) => selectedChannel?.id === channelId)
        .map(({ id, body, username }) => {
          return (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>: {body}
            </div>
          );
        })}
    </div>
  );
};

export { MessagesList };
