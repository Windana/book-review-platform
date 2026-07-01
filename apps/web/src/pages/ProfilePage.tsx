import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  return (
    <section>
      <h2>Profile</h2>
      <p>Placeholder profile page for {username ?? 'unknown user'}.</p>
    </section>
  );
}

export default ProfilePage;
