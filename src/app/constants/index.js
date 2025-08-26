export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "首頁",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "搜尋",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "通知",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "建立貼文",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "探索",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "個人檔案",
  },
];

export const profileTabs = [
  { value: "threads", label: "貼文", icon: "/assets/reply.svg" },
  { value: "replies", label: "回覆", icon: "/assets/members.svg" },
  { value: "tagged", label: "被標註", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "貼文", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];