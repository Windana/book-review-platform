import { Link, Outlet } from 'react-router-dom';
import { appRoutes } from './routes';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Book Review Platform</h1>
        <nav>
          <Link to={appRoutes.home}>Home</Link>
          <Link to={appRoutes.login}>Login</Link>
          <Link to={appRoutes.dashboard}>Dashboard</Link>
          <Link to={appRoutes.profile('demo-user')}>Profile</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
