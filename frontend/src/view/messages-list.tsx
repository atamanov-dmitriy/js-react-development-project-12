import { useEffect, useRef } from "react";
import { useAppSelector } from "../@redux/hooks";
import { useFetchMessagesQuery } from "../model/messages/messages.api";

const MessagesList = () => {
  const { data } = useFetchMessagesQuery();
  const selectedChannel = useAppSelector(
    (state) => state.channels.selectedChannel,
  );

  const messagesElement = useRef<HTMLDivElement>(null);

  const messages = data
    ? data.filter(({ channelId }) => selectedChannel?.id === channelId)
    : [];

  useEffect(() => {
    if (messagesElement.current !== null) {
      messagesElement.current.scrollBy({
        top: messagesElement.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  return (
    <div ref={messagesElement} className="chat-messages overflow-auto px-5 ">
      {messages.map(({ id, body, username }) => {
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
