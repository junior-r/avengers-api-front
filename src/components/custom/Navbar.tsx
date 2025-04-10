import { Link } from 'react-router'
import { Button } from '../ui/button'
import AvengersLogo from '../images/AvengersLogo'
import { ModeToggle } from '../mode-toggle'
import { LogIn, UserRound } from 'lucide-react'
import { useAuthStore } from '@/store/auth/useAuthStore'
import UserMenu from './UserMenu'

function Navbar() {
    const user = useAuthStore(state => state.user)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto">
                <div className="flex items-center">
                    <AvengersLogo className="w-12 h-12 text-yellow-500 dark:text-yellow-300" />
                    <span className="text-xl font-bold italic">The Avengers</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <Link to="#" className="text-sm font-medium hover:text-primary">
                        Home
                    </Link>
                    <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Products
                    </Link>
                    <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Categories
                    </Link>
                    <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        About
                    </Link>
                    <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Contact
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Button asChild variant={"outline"}>
                                <Link to="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-primary">
                                    <span>Login</span>
                                    <LogIn />
                                </Link>
                            </Button>
                            <Button asChild variant={"default"}>
                                <Link to="/auth/register" className="text-sm font-medium text-muted-foreground hover:text-primary">
                                    <span>Register</span>
                                    <UserRound />
                                </Link>
                            </Button>
                        </>
                    ) : <UserMenu user={user} />}

                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Navbar