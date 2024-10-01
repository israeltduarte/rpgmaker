import Link from 'next/link';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isSubMenu?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, isSubMenu = false }) => {
  const itemClasses = `block w-full h-full text-white flex items-center justify-center p-4 hover:text-indigo-200 transition-colors duration-300`;
  const divClasses = isSubMenu ? '' : 'm-0 flex items-center h-16 hover:bg-indigo-700 transition-colors duration-300';

  return (
    <div className={divClasses}>
      <Link href={href} className={itemClasses}>
        {children}
      </Link>
    </div>
  );
};

export default NavItem;
