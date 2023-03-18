interface ZAuthor {
  id: string;
  url_token: string;
  name: string;
  use_default_avatar: boolean;
  avatar_url: string;
  avatar_url_template: string;
  is_org: boolean;
  type: "people";
  url: string;
  user_type: "people";
  headline: string;
  headline_render: string;
  is_active: boolean;
  description: string;
  gender: 1;
  is_advertiser: boolean;
  ip_info: string;
  vip_info: {
    is_vip: boolean;
    vip_type: 1;
    rename_days: string;
    entrance_v2: null;
    rename_frequency: number;
    rename_await_days: number;
  };
  level_info: {
    exp: number;
    level: number;
    nickname_color: {
      color: string;
      night_mode_color: string;
    };
    notice: string;
    level_icon: string;
    icon_info: {
      url: string;
      night_mode_url: string;
      width: number;
      height: number;
    };
    is_marked: boolean;
    icon_info_v2: {
      url: string;
      night_mode_url: string;
      width: number;
      height: number;
    };
  };
  badge: [];
  badge_v2: {
    title: string;
    merged_badges: [];
    detail_badges: [];
    icon: string;
    night_icon: string;
  };
  all_verify_apply: {
    apply_status: number;
    applys: [];
    show_entrance: boolean;
  };
  account_status: [];
  audio: {
    id: string;
    duration: number;
    type: "audio";
    url: string;
  };
  is_following: boolean;
  is_followed: boolean;
  is_blocking: boolean;
  is_activity_blocked: boolean;
  is_baned: boolean;
  is_locked: boolean;
  is_force_renamed: boolean;
  is_apply_renamed: boolean;
  is_hanged: boolean;
  is_force_reset_password: boolean;
  is_noti_reset_password: boolean;
  is_destroy_waiting: boolean;
  follower_count: number;
  following_count: number;
  answer_count: number;
  question_count: number;
  articles_count: number;
  independent_articles_count: number;
  columns_count: number;
  zvideo_count: number;
  favorite_count: number;
  favorited_count: number;
  lite_favorite_content_count: number;
  pins_count: number;
  reactions_count: number;
  shared_count: number;
  voteup_count: number;
  thanked_count: number;
  live_count: number;
  hosted_live_count: number;
  participated_live_count: number;
  included_answers_count: number;
  included_articles_count: number;
  included_text: string;
  marked_answers_text: string;
  following_columns_count: number;
  following_topic_count: number;
  following_question_count: number;
  following_favlists_count: number;
  recognized_count: number;
  available_medals_count: number;
  business: {
    id: string;
    type: "topic";
    url: string;
    name: string;
    avatar_url: string;
  };
  location: [];
  cover_url: string;
  cover_url_template: string;
  juror: {
    is_juror: boolean;
    vote_count: number;
    review_count: number;
    review_liked_count: number;
  };
  is_bind_sina: boolean;
  renamed_fullname: string;
  is_bind_phone: boolean;
  is_realname: boolean;
  is_unicom_free: boolean;
  has_applying_column: boolean;
  is_enable_watermark: boolean;
  is_enable_double_click_voteup: boolean;
  is_enable_unfriendly_message: boolean;
  is_enable_signalment: boolean;
  open_ebook_feature: boolean;
  is_subscribing: boolean;
  infinity: {
    user_id: string;
    is_activated: boolean;
    url: string;
    show_my_infinity_entrance: boolean;
    consultations_count: number;
  };
  mcn_user_info: {
    status: 0;
    showcase_permission: 0;
    jingdong_param: string;
    jingdong_app_param: string;
    available_source: [];
    bind_info: [
      {
        pid: string;
        source: string;
      },
      {
        pid: string;
        source: string;
      }
    ];
    goods_count: number;
  };
  creator_info: {
    is_allow_enter: boolean;
    activity_topping: boolean;
  };
  self_recommend: string;
  exposed_medal: {
    medal_id: string;
    medal_name: string;
    avatar_url: string;
    description: string;
    mini_avatar_url: string;
    medal_avatar_frame: string;
    profile_medal_avatar_frame: string;
    avatar_frame_type: "empty";
    avatar_frame_jump_url: string;
    show_avatar_tips: {
      title: string;
      description: string;
      btn_text: string;
      jump_url: string;
    };
  };
  follow_content_count: number;
  today_active: {
    creation_count: number;
    vote_count: number;
    follow_count: number;
    comment_count: number;
  };
  creator_level: number;
  current_timestamp: number;
}
