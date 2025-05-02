
export type MenuItem = {
  title: string;
  path: string;
  submenu?: { title: string; path: string }[];
};

// Separate menu items into public and protected
export const publicMenuItems: MenuItem[] = [
  { title: "About", path: "/about" },
];

export const protectedMenuItems: MenuItem[] = [
  { 
    title: "News & Events", 
    path: "/news-events",
    submenu: [
      { title: "News", path: "/news" },
      { title: "Events", path: "/events" },
      { title: "News & Events 3", path: "#" }
    ]
  },
  { 
    title: "Explore", 
    path: "/explore",
    submenu: [
      { title: "Explore 1", path: "#" },
      { title: "Explore 2", path: "#" },
      { title: "Explore 3", path: "#" }
    ]
  },
  { 
    title: "Invest", 
    path: "/invest",
    submenu: [
      { title: "Invest 1", path: "#" },
      { title: "Invest 2", path: "#" },
      { title: "Invest 3", path: "#" }
    ]
  },
];
