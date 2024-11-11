const hasServer = process.env["REACT_APP_SERVER"] !== undefined;
export const SERVER = hasServer ? process.env["REACT_APP_SERVER"] : "http://127.0.0.1";
export const SERVER_PORT = hasServer ? parseInt(process.env["REACT_APP_SERVER_PORT"] ?? "443") : 4001;

export const HASH_ROUTER = process.env["REACT_APP_HASH_ROUTER"] === "true";
