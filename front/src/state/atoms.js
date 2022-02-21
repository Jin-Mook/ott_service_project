import { atom, selector } from "recoil";

export const loginState = atom({
    key: "login",
    default: false,
});

export const genresState = atom({
    key: "genres",
    default: {},
});

export const resultMovieState = atom({
    key: "resultMovie",
    default: [],
});

export const previewTrackState = atom({
    key: "previewTrack",
    default: [],
});

export const AudioState = atom({
    key: "Audio",
    default: false,
});
