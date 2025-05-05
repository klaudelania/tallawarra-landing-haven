
export type MenuItem = {
  title: string;
  path: string;
  submenu?: { title: string; path: string }[];
};

// Separate menu items into public and protected
export const publicMenuItems: MenuItem[] = [
  { title: "About", path: "/about" },
  { title: "FAQ", path: "/faq" },
];

export const protectedMenuItems: MenuItem[] = [
  { 
    title: "News & Events", 
    path: "/news-events",
    submenu: [
      { title: "News", path: "/news" },
      { title: "Events", path: "/events" },
      { title: "News & Events 3", path: "/news-events-3" }
    ]
  },
  { 
    title: "Explore", 
    path: "/explore",
    submenu: [
      { title: "Explore 1", path: "/explore-1" },
      { title: "Explore 2", path: "/explore-2" },
      { title: "Explore 3", path: "/explore-3" }
    ]
  },
  { 
    title: "Invest", 
    path: "/invest",
    submenu: [
      { title: "Invest 1", path: "/invest-1" },
      { title: "Invest 2", path: "/invest-2" },
      { title: "Invest 3", path: "/invest-3" }
    ]
  },
];
