interface ZPin {
  source_pin_id: number;
  can_top: boolean;
  likers: ZAuthor[];
  favlists_count: number;
  topics: ZTopic[];
  admin_closed_comment: boolean;
  like_count: number;
  questions: ZQuestion | null;
  top_reactions: {
    like: number;
  };
  reaction_instruction: {};
  reaction_relation: {
    vote: number;
    like: number;
  };
  id: string;
  favorite_count: number;
  page_view_count: null;
  self_create: boolean;
  author: ZAuthor;
  state: "normal";
  comments: [];
  content: (ZPinImageContent | ZPinTextContent)[];
  comment_count: number;
  regulate_info: {
    is_regulating: boolean;
  };
  tag_specials: Record<string, string>;
  type: "pin";
  is_admin_close_repin: boolean;
  virtuals: {
    is_liked: boolean;
    is_favorited: boolean;
  };
  updated: number;
  tags: string[];
  meet_reaction_guide_conditions: boolean;
  is_top: boolean;
  long_threshold: [
    {
      width: number;
      height: number;
    },
    {
      width: number;
      height: number;
    }
  ];
  ab_config: {
    md_interact_unify: "0";
  };
  reaction_count: number;
  view_permission: "all";
  is_deleted: boolean;
  created: number;
  url: string;
  comment_permission: "all";
  repin_count: number;
  excerpt_title: string;
  content_html: string;
}

interface ZPinTextContent {
  text_link_type: "none";
  title: string;
  content: string;
  fold_type: "raw";
  own_text: string;
  type: "text";
}

interface ZPinImageContent {
  is_gif: boolean;
  watermark_url: string;
  is_long: boolean;
  is_watermark: boolean;
  url: string;
  original_url: string;
  cropped_url: string;
  height: number;
  width: number;
  type: "image";
  thumbnail: string;
}
