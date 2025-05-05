
import { Link } from "react-router-dom";
import { ChevronDown, ExternalLink } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MenuItem = {
  title: string;
  path: string;
  submenu?: { title: string; path: string }[];
};

type NavLinksProps = {
  publicMenuItems: MenuItem[];
  protectedMenuItems: MenuItem[];
};

export const NavLinks = ({ publicMenuItems, protectedMenuItems }: NavLinksProps) => (
  <NavigationMenu className="hidden md:flex flex-wrap">
    <NavigationMenuList className="flex flex-wrap gap-4">
      {/* Public menu items - with potential submenu */}
      {publicMenuItems.map((item) => (
        <NavigationMenuItem key={item.path}>
          {item.submenu ? (
            <DropdownMenu>
              <DropdownMenuTrigger 
                className="text-white hover:text-white/80 transition-colors px-2 py-1 flex items-center gap-1 whitespace-nowrap"
              >
                {item.title} <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-morphism rounded-xl">
                {/* Link to the main menu item as first dropdown item */}
                <DropdownMenuItem className="text-white hover:bg-white/30 hover:text-white rounded-lg transition-colors">
                  <Link to={item.path} className="w-full px-4 py-2 whitespace-nowrap">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
                
                {/* Submenu items */}
                {item.submenu?.map((subitem) => (
                  <DropdownMenuItem key={subitem.path} className="text-white hover:bg-white/30 hover:text-white rounded-lg transition-colors">
                    <Link to={subitem.path} className="w-full px-4 py-2 whitespace-nowrap">
                      {subitem.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to={item.path}
              className="text-white hover:text-white/80 transition-colors px-2 py-1 whitespace-nowrap"
            >
              {item.title}
            </Link>
          )}
        </NavigationMenuItem>
      ))}
      
      {/* Protected menu items */}
      {protectedMenuItems.map((item) => (
        <NavigationMenuItem key={item.title}>
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="text-white hover:text-white/80 transition-colors px-2 py-1 flex items-center gap-1 whitespace-nowrap"
            >
              {item.title} <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-morphism rounded-xl">
              {item.submenu?.map((subitem) => (
                <DropdownMenuItem key={subitem.path} className="text-white hover:bg-white/30 hover:text-white rounded-lg transition-colors">
                  <Link to={subitem.path} className="w-full px-4 py-2 whitespace-nowrap">
                    {subitem.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      ))}
      
      {/* External link - always public */}
      <NavigationMenuItem>
        <a
          href="https://www.bridgehill.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-colors px-2 py-1 flex items-center gap-1 whitespace-nowrap"
        >
          Bridgehill Group <ExternalLink size={14} />
        </a>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
