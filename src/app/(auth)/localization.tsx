import { zhTW } from "@clerk/localizations";

export const zhTWLocalization = {
  ...zhTW,

  signIn: {
    ...zhTW.signIn,
    start: {
      ...zhTW.signIn?.start,
      title: "登入 Threads",
      subtitle: "歡迎回來，請登入以繼續",
      actionText: "尚未註冊嗎？",
      actionLink: "註冊帳號",
    },
    formButtonPrimary: "繼續",
    dividerText: "或",
    alternativeMethods: {
      ...zhTW.signIn?.alternativeMethods,
      title: "其他登入方式",
      blockButton__github: "使用 GitHub 登入",
      blockButton__google: "使用 Google 登入",
    },
    footerActionText: "還沒有帳號嗎？",
    footerActionLink: "註冊帳號",
  },

  signUp: {
    ...zhTW.signUp,
    start: {
      title: "建立您的帳戶",
      subtitle: "以繼續前往 Threads",
      actionText: "已經有帳號了嗎？",
      actionLink: "登入",
    },
    formButtonPrimary: "繼續",
    usernameField: {
      label: "使用者名稱",
      placeholder: "請輸入使用者名稱",
    },
    emailAddressField: {
      label: "電子郵件地址",
      placeholder: "請輸入電子郵件地址",
    },
    passwordField: {
      label: "密碼",
      placeholder: "請輸入密碼",
    },
  },

  formFieldInput__username: {
    placeholder: "請輸入使用者名稱",
  },
  formFieldInput__emailAddress: {
    placeholder: "請輸入電子郵件地址",
  },
  formFieldInput__password: {
    placeholder: "請輸入密碼",
  },
};
