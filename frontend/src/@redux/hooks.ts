import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "./store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export { useAppSelector, useAppDispatch };
