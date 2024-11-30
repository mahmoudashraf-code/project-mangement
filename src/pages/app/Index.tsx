import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

type IconProps = React.HTMLAttributes<SVGElement>

const Logo = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
    <rect width="256" height="256" fill="none" />
    <line
      x1="208"
      y1="128"
      x2="128"
      y2="208"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <line
      x1="192"
      y1="40"
      x2="40"
      y2="192"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
)

export default function Index() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="bg-gray-100 h-full flex flex-col overflow-hidden">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border border-gray-200">
        <div className="flex h-14 items-center px-4">
          <div className="mr-4 flex">
            <a href="/app" className="mr-4 flex items-center gap-2 mr-6">
              <Logo className="h-6 w-6" />
              <span className="font-bold inline-block">
                Daily Tasks
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center gap-2 justify-end">
            <nav className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-8 w-8 px-0" onClick={() => navigate("/app/profile")}>
                <User className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-red-600" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <div className='flex-1 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  );
}
