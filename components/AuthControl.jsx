'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import useAuthUser from '../store/useAuthUser';

const AuthControl = () => {
  const { logout } = useAuthUser();
  const { data: session } = useSession();

  const router = useRouter();

  const handleLogin = async () => {
    router.push('/signin'); 
  };

  const handleLogout = async () => {
    logout();
  };

  return (
    <div>
    {session?.user?.email ? ( 
      <div>
        <p>Welcome {session.user.name}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      ):(
        <button onClick={handleLogin}>Login</button>
      )
    }
    </div>
  );
};

export default AuthControl;
