interface ZCommentData {
  id: string;
  type: "comment";
  resource_type: ZTarget["type"];
  url: string;
  hot: boolean;
  top: boolean;
  content: string;
  score: number;
  created_time: number;
  is_delete: boolean;
  collapsed: boolean;
  reviewing: boolean;
  reply_comment_id: string;
  reply_root_comment_id: string;
  liked: boolean;
  like_count: number;
  disliked: boolean;
  dislike_count: number;
  is_author: boolean;
  can_like: boolean;
  can_dislike: boolean;
  can_delete: boolean;
  can_reply: boolean;
  can_hot: boolean;
  can_author_top: boolean;
  is_author_top: boolean;
  can_collapse: boolean;
  can_share: boolean;
  can_unfold: boolean;
  can_truncate: boolean;
  can_more: boolean;
  cannot_reply_reason?: string;
  author: ZAuthor;
  author_tag: {
    type: "content_author";
    text: string;
    color: string;
    night_color: string;
    has_border: boolean;
    border_color: string;
    border_night_color: string;
  }[];
  reply_to_author?: ZAuthor;
  reply_author_tag: unknown[];
  content_tag: unknown[];
  comment_tag: {
    type: "hot" | "ip_info";
    text: string;
    color: string;
    night_color: string;
    has_border: boolean;
  }[];
  child_comment_count: number;
  child_comments?: ZCommentData[];
}

interface ZChildComment {
  counts: {
    total_counts: number;
    collapsed_counts?: number;
    reviewing_counts?: number;
  };
  data: ZCommentData[];
  edit_status: {
    can_reply: boolean;
    toast: string;
  };
  paging: {
    is_end: boolean;
    is_start: boolean;
    next: string;
    previous: string;
    totals: number;
  };
  root: ZCommentData;
  sorter: {
    type: "score" | "ts";
    text: "默认" | "时间";
  }[];
}

interface ZRootComment extends Omit<ZChildComment, "root"> {
  comment_status: {
    type: 0;
    text: string;
    induce_text: string;
  };
  header: unknown[];
  is_content_author: boolean;
}
