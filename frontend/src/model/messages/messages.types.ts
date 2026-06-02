import type { PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  body: string;
  channelId: string;
  username: string;
}

type PostQueryArg = Omit<Message, "id">;

type PatchQueryArg = Pick<Message, "id" | "body">;

type DeleteQueryArg = Pick<Message, "id">;

type DeleteResultType = Pick<Message, "id">;

type ChannelState = {
  selectedChannel: Message | null;
  modalAddOpen: { isOpen: boolean };
  modalRenameOpen: { isOpen: boolean; channel: Message | null };
  modalDeleteOpen: { isOpen: boolean; id: Message["body"] | null };
};

type SelectAction = PayloadAction<Message>;

export type {
  Message,
  PostQueryArg,
  PatchQueryArg,
  DeleteQueryArg,
  DeleteResultType,
  ChannelState,
  SelectAction,
};
