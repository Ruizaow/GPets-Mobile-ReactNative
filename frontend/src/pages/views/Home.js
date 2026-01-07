import { useHomeView } from '@context/HomeViewContext';
import Feed from './homeViews/Feed';
import SelectPost from './homeViews/SelectPost';
import MapView from './homeViews/MapView';
import { HomeLayout } from '@pages/HomeLayout';

export default function Home({ navigation }) {
  const { currentView, setCurrentView } = useHomeView();

  const views = {
    Feed: <Feed navigation={navigation}/>,
    SelectPost: <SelectPost navigation={navigation}/>,
    MapView: <MapView/>,
  };

  return (
    <HomeLayout
      navigation={navigation}
      onGoTo={setCurrentView}
      currentView={currentView}
    >
      {views[currentView]}
    </HomeLayout>
  );
}