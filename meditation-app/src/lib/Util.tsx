import * as Constants from "./Constants";

export const request = (loc: string, options?: RequestInit) => {
  const url = new URL(loc, Constants.SERVER + ":" + Constants.SERVER_PORT);

  options ??= {};
  options.credentials ??= "include";

  return fetch(url, options);
}

export const createDateReviver = (...keys: string[]) => {
  const k = new Set(keys);

  return (key: string, val: string) => {
    if (!k.has(key))
      return val;

    const date = Date.parse(val);
    if (isNaN(date))
      throw new Error("Key '" + key + "' could not be parsed.");
    return new Date(date);
  };
};

export const get = (loc: string, reviver?: (this: any, key: string, value: any) => any) => {
  return request(loc).then(async res => {
    if (res.status !== 200)
      throw new Error(res.status + ": " + await res.text());

    const content = JSON.parse(await res.text(), reviver);
    return content;
  });
};

export const post = (loc: string, body: unknown) => {
  return request(loc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
