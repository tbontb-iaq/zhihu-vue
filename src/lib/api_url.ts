export enum ZApiUrl {
  me = "https://api.zhihu.com/me",
  people = "https://api.zhihu.com/people/%(id)s",

  explore = "https://api.zhihu.com/explore/guest/feeds",
  recommend = "https://api.zhihu.com/topstory/recommend",

  pin = "https://api.zhihu.com/pins/%(id)s",
  answer = "https://api.zhihu.com/answers/%(id)s",
  article = "https://api.zhihu.com/articles/%(id)s",
  video = "https://lens.zhihu.com/api/v4/videos/%{id}s",

  root_comment = "https://api.zhihu.com/comment_v5/%(type)ss/%(id)s/root_comment",
  child_comment = "https://api.zhihu.com/comment_v5/comment/%(id)s/child_comment",

  sticker_groups = "https://www.zhihu.com/api/v4/me/sticker-groups",
  sticker = "https://www.zhihu.com/api/v4/sticker-groups/%(id)s",
}

// 回答中出现的商品链接
// linkcard = "https://www.zhihu.com/api/v4/mcn/v2/linkcards?content_type=answer&token=2785397137",

// 问题相关
// https://api.zhihu.com/v5.1/topics/question/576634845/relation

export type TypeMaps = {
  [K in ZApiUrl]: {
    [ZApiUrl.me]: NoParamQuery & { return: ZMe };
    [ZApiUrl.people]: {
      param: HasId;
      query: IncludeParam<ZAuthor>;
      return: ZAuthor;
    };

    [ZApiUrl.explore]: NoParamQuery & { return: ZFeed };
    [ZApiUrl.recommend]: NoParamQuery & { return: ZFeed };

    [ZApiUrl.pin]: {
      param: HasId;
      query: IncludeParam<ZPin>;
      return: ZPin;
    };
    [ZApiUrl.answer]: {
      param: HasId;
      query: IncludeParam<ZAnswer>;
      return: ZAnswer;
    };
    [ZApiUrl.article]: {
      param: HasId;
      query: IncludeParam<ZArticle>;
      return: ZArticle;
    };
    [ZApiUrl.video]: NoParamQuery & { return: ZVideo };

    [ZApiUrl.root_comment]: {
      param: HasId & HasType;
      query: Orderable & Limitable;
      return: ZRootComment;
    };
    [ZApiUrl.child_comment]: {
      param: HasId;
      query: Orderable & Limitable;
      return: ZChildComment;
    };

    [ZApiUrl.sticker_groups]: NoParamQuery & { return: ZStickerGroups };
    [ZApiUrl.sticker]: { param: HasId; query: {}; return: ZStickerData };
  }[K];
};

// question.answer_count,comment_count,follower_count
// 后面 3 个 count 全是 question 的

type FlattenKeyof<T, K extends keyof T & string = keyof T & string> =
  | K
  | (K extends string
      ? T[K] extends object
        ? `${K}.${FlattenKeyof<T[K]>}` | FlattenKeyof<T[K]>
        : never
      : never);

type HasId = { id: number | string };
type HasType = { type: ZTarget["type"] };
type Orderable = {
  order_by:
    | "score" // 默认
    | "ts"; // 最新
};
type Limitable = { limit: number };
type IncludeParam<T> = { include: FlattenKeyof<T>[] };

type NoParamQuery = { param: {}; query: {} };
