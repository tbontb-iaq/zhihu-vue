type StyleValue = import("vue").StyleValue;

type ToastInfo = {
  message: string;
  title?: string;
  icon?: string;
  close_button?: boolean;
  progress_bar?: boolean;

  duration?: number;

  style?: {
    toast?: StyleValue;
    title?: StyleValue;
    message?: StyleValue;
    icon?: StyleValue;
    close_button?: StyleValue;
    progress_bar?: StyleValue;
  };
};
