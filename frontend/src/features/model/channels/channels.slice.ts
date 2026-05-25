import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Channel, ChannelState, SelectAction } from "./channels.types";

const initialState: ChannelState = {
  selectedChannel: null,
  modalAddOpen: {
    isOpen: false,
  },
  modalRenameOpen: {
    isOpen: false,
    channel: null,
  },
  modalDeleteOpen: {
    isOpen: false,
    id: null,
  },
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    select(state, action: SelectAction) {
      state.selectedChannel = action.payload;
    },
    setIsModalAddOpen(state, action: PayloadAction<boolean>) {
      state.modalAddOpen.isOpen = action.payload;
    },
    setIsModalRenameOpen(
      state,
      action: PayloadAction<{ isOpen: boolean; channel: Channel | null }>,
    ) {
      state.modalRenameOpen = action.payload;
    },
    setIsModalDeleteOpen(
      state,
      action: PayloadAction<{ isOpen: boolean; id: Channel["id"] | null }>,
    ) {
      state.modalDeleteOpen = action.payload;
    },
  },
});

const { actions: channelsActions, reducer: channelsReducer } = channelsSlice;
export { channelsActions, channelsReducer };
