import { Nav } from "react-bootstrap";
import { useFetchChannelsQuery } from "../model/channels/channels.api";
import { ChannelsItem } from "./channels-item";

const ChannelsList = () => {
  const { data: channels } = useFetchChannelsQuery();

  return (
    <Nav
      id="channels-box"
      variant="pills"
      fill
      className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels?.map((channel) => (
        <Nav.Item key={channel.id} className="w-100">
          <ChannelsItem channel={channel} />
        </Nav.Item>
      ))}
    </Nav>
  );
};

export { ChannelsList };
