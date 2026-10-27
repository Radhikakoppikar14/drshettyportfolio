import Home from './pages/Home.tsx';
import SitePage from './pages/sitePage.tsx';
import { dental, heart } from './data.ts';
import { useRoute } from './router.ts';
import ScrollTop from './components/ScrollTop.tsx';

// 3 views: common home page (#/), heart care website (#/heart), dental care website (#/dental).
export default function App() {
  const route = useRoute();
  return (
    <>
      {route === 'heart' ? <SitePage key="heart" d={heart} /> : route === 'dental' ? <SitePage key="dental" d={dental} /> : <Home />}
      <ScrollTop />
    </>
  );
}