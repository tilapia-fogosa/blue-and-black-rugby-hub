
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Events from '@/components/Events';
import History from '@/components/History';
import Athletes from '@/components/Athletes';
import Sponsors from '@/components/Sponsors';
import Shop from '@/components/Shop';
import JoinForm from '@/components/JoinForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Gallery />
      <Events />
      <History />
      <Athletes />
      <Sponsors />
      <Shop />
      <JoinForm />
      <Footer />
    </div>
  );
};

export default Index;
