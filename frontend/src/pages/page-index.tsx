import { ChannelAdd } from "../view/channel-add";
import { ChannelsList } from "../view/channels-list";
import { ChannelInfo } from "../view/channel-info";
import { MessagesList } from "../view/messages-list";
import { MessagesForm } from "../view/messages-from";

const PageIndex = () => {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelAdd />
          <ChannelsList />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChannelInfo />
            <MessagesList />
            <div className="mt-auto px-5 py-3">
              <MessagesForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageIndex };
