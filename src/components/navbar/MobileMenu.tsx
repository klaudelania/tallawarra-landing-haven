
import { ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type MenuItem = {
  title: string;
  path: string;
  submenu?: { title: string; path: string }[];
};

type MobileMenuProps = {
  publicMenuItems: MenuItem[];
  protectedMenuItems: MenuItem[];
};

export const MobileMenu = ({ publicMenuItems, protectedMenuItems }: MobileMenuProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="text-white md:hidden">
        <Menu size={24} />
      </Button>
    </SheetTrigger>
    <SheetContent side="top" className="pt-12 glass-morphism">
      <div className="flex flex-col gap-4">
        {/* Public menu items - with potential submenu */}
        {publicMenuItems.map((item) => (
          <div key={item.path} className="flex flex-col">
            {item.submenu ? (
              <Collapsible>
                <CollapsibleTrigger
                  className="px-4 py-2 text-lg hover:bg-white/30 text-white rounded-md transition-colors flex items-center justify-between w-full"
                >
                  {item.title}
                  <ChevronDown size={18} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-8 flex flex-col gap-2 mt-2 glass-morphism rounded-xl p-2">
                    {/* Link to the main menu item as first dropdown item */}
                    <Link
                      to={item.path}
                      className="px-4 py-1 text-md hover:bg-white/30 text-white rounded-md transition-colors"
                    >
                      {item.title}
                    </Link>
                    
                    {/* Submenu items */}
                    {item.submenu?.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        className="px-4 py-1 text-md hover:bg-white/30 text-white rounded-md transition-colors"
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                to={item.path}
                className="px-4 py-2 text-lg hover:bg-white/30 text-white rounded-md transition-colors"
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
        
        {/* Protected menu items */}
        {protectedMenuItems.map((item) => (
          <div key={item.title} className="flex flex-col">
            <Collapsible>
              <CollapsibleTrigger
                className="px-4 py-2 text-lg hover:bg-white/30 text-white rounded-md transition-colors flex items-center justify-between w-full"
              >
                {item.title}
                <ChevronDown size={18} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-8 flex flex-col gap-2 mt-2 glass-morphism rounded-xl p-2">
                  {item.submenu?.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      className="px-4 py-1 text-md hover:bg-white/30 text-white rounded-md transition-colors"
                    >
                      {subitem.title}
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
        
        <a
          href="https://www.bridgehill.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-lg hover:bg-white/30 text-white rounded-md transition-colors flex items-center gap-2"
        >
          Bridgehill Group <ExternalLink size={18} />
        </a>
      </div>
    </SheetContent>
  </Sheet>
);
