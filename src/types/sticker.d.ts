type ZStickerGroups = {
  data: {
    sticker_count: number;
    title: string;
    icon_url: string;
    version: number;
    selected_icon_url: string | null;
    type: "emoji" | "official" | "vip";
    id: string;
  }[];
};

type ZStickerData = {
  data: {
    icon_url: string;
    id: string;
    selected_icon_url: string | null;
    stickers: ZSticker[];
    title: string;
    type: ZStickerGroups["data"][0]["type"];
    version: number;
  };
};

type ZSticker = {
  static_image_url: string;
  title: string;
  dynamic_image_url: string | null;
  group_id: string;
  id: string;
  placeholder?: string;
};
