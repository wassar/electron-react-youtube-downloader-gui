import store from "./store";

declare global {
    type RootState = ReturnType<typeof store.getState>;
}

declare module "react-redux" {
    interface DefaultRootState extends RootState {}
}
