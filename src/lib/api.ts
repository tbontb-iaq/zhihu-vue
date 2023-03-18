import { sprintf } from "sprintf-js";
import type { ZApiUrl, TypeMaps } from "./api_url";

class ZApi {
  public logged: boolean = false;

  constructor(private retry = 3) {}

  private async retry_get<T>(url: string, retry = this.retry): Promise<T> {
    try {
      const res = await fetch(url, { credentials: "include" }),
        isJson = res.headers.get("content-type")?.includes("json");
      if (res.ok)
        if (isJson) return res.json();
        else throw { text: await res.text(), message: "无效的数据类型" };
      else
        throw {
          status: res.status,
          statusText: res.statusText,
          text: isJson ? undefined : await res.text(),
          json: isJson ? await res.json() : undefined,
        };
    } catch (e) {
      if (retry) return this.retry_get(url, --retry);
      else throw e;
    }
  }

  async url_get<T>(raw_url: string): Promise<T> {
    const params = new URLSearchParams({ url: raw_url }),
      url = `${location.protocol}//${location.hostname}:3000/get?${params}`;
    return this.retry_get(url);
  }

  async get<T extends ZApiUrl>(
    api: T,
    param: TypeMaps[T]["param"],
    query?: Partial<TypeMaps[T]["query"]>
  ): Promise<TypeMaps[T]["return"]> {
    const raw_url = sprintf(api, param),
      query_str = new URLSearchParams(query as any);
    return this.url_get(raw_url + "?" + query_str);
  }
}

export { ZApi };
