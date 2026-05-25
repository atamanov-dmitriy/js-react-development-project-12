import type { PayloadAction } from "@reduxjs/toolkit";

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

type PostQueryArg = Pick<Channel, "name">;

type PatchQueryArg = Pick<Channel, "id" | "name">;

type DeleteQueryArg = Pick<Channel, "id">;

type DeleteResultType = Pick<Channel, "id">;

type ChannelState = {
  selectedChannel: Channel | null;
  modalAddOpen: { isOpen: boolean };
  modalRenameOpen: { isOpen: boolean; channel: Channel | null };
  modalDeleteOpen: { isOpen: boolean; id: Channel["id"] | null };
};

type SelectAction = PayloadAction<Channel>;

export type {
  Channel,
  PostQueryArg,
  PatchQueryArg,
  DeleteQueryArg,
  DeleteResultType,
  ChannelState,
  SelectAction,
};
