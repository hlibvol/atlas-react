import { createSlice, current } from "@reduxjs/toolkit";

import { Resource, Action } from "services/enums";

interface IDrawerProps {
  resource: Resource | undefined;
  action: Action | undefined;
  itemId: number | undefined;
  title: string | undefined;
  footer: JSX.Element | undefined;
  activeField: string | undefined;
}

const initialState: IDrawerProps = {
  resource: undefined,
  action: undefined,
  itemId: undefined,
  title: undefined,
  footer: undefined,
  activeField: undefined,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      const currState = current(state);
      return { ...currState, ...action.payload };
    },
    closeDrawer: () => {
      return initialState;
    },
    setDrawerTitle: (state, action) => {
      const currState = current(state);
      return { ...currState, title: action.payload };
    },
    setDrawerFooter: (state, action) => {
      const currState = current(state);
      return { ...currState, footer: action.payload };
    },
    removeActiveField: (state) => {
      const currState = current(state);
      return { ...currState, activeField: undefined };
    },
  },
});

export const { openDrawer, closeDrawer, setDrawerTitle, setDrawerFooter, removeActiveField } =
  drawerSlice.actions;

export default drawerSlice.reducer;
