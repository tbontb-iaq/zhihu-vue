interface ZFeed {
  data: (
    | {
        id: string;
        type: "feed";
        target: ZAnswer | ZArticle;
      }
    | {
        id: string;
        type: "feed_advert";
      }
  )[];
  paging?: {
    previous: string;
    next: string;
    is_end: boolean;
  };
  fresh_text?: string;
  feed_request_id?: string;
}

interface ZTarget {
  id: number;
  type: "answer" | "article";
  author: ZAuthor;
  excerpt: string;
  content: string;

  voteup_count: number;
  favlists_count: number;
  comment_count: number;

  thumbnail?: string | null;
  thumbnails?: string[];
}

interface ZAnswer extends ZTarget {
  type: "answer";
  question: ZQuestion;
  thanks_count: number;
  created_time: number;
  updated_time: number;
}

interface ZArticle extends ZTarget {
  type: "article";
  title: string;
  liked_count: number;
  created: number;
  updated: number;
}

interface ZQuestion {
  title: string;
  author: ZAuthor;
  answer_count: number;
  follower_count: number;
  comment_count: number;
}

interface ZTopic {
  // zhihu://topic/26510406/pin20
  url: string;
  topic_type: "NORMAL";
  type: "topic";
  id: string;
  name: string;
}
