import AddTimerButton from './Add-timer-button';
import Layout from './Layout';
import TimersList from './TimersList';
import { GlobalStyle } from '@/Globalstyle';

export const App = () => {
  return (
    <>
      <Layout>
        <AddTimerButton />
        <TimersList />
      </Layout>
      <GlobalStyle />
    </>
  );
};
