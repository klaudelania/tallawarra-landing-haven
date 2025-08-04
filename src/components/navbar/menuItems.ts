
export type MenuItem = {
  title: string;
  path: string;
  submenu?: { title: string; path: string }[];
};

// Separate menu items into public and protected
export const publicMenuItems: MenuItem[] = [
  { 
    title: "About", 
    path: "/about",
    submenu: [
      { title: "People", path: "/people" }
    ]
  },
  { title: "FAQ", path: "/faq" },
];

export const protectedMenuItems: MenuItem[] = [
  { 
    title: "News & Events", 
    path: "/news-events",
    submenu: [
      { title: "News", path: "/news" },
      { title: "Events", path: "/events" }
    ]
  },
  { 
    title: "Invest", 
    path: "/invest",
    submenu: [
      { title: "How to make Tallawarra home?", path: "/invest-1" }
    ]
  },
];
