import Link from "next/link";

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <Link href='/profile/update'>Edit User Profile</Link>
    </div>
  );
}
