import HandpickForm from '@/components/HandpickForm';
import { initIframeAutoHeight } from '@/utils/iframeAutoHeight';
const Index = () => {
  initIframeAutoHeight({
  //  parentOrigin: 'https://www.riaajvintage.com/'
});
  return <HandpickForm />;
};

export default Index;
