import { useAppSelector } from "../../@redux/hooks";

const ChannelInfo = () => {
  const selectedChannel = useAppSelector(
    (state) => state.channels.selectedChannel,
  );

  const name = selectedChannel?.name ?? "";

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${name}`}</b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
  );
};

export { ChannelInfo };
