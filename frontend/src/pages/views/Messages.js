import { useEffect, useState } from 'react';
import MessagesList from './messagesViews/MessagesList';
import PrivateChat from './messagesViews/PrivateChat';
import PrivateChatAlt from './messagesViews/PrivateChatAlt';

export default function Messages({ navigation, route }) {
  const [currentView, setCurrentView] = useState('MessagesList');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [postOwnerId, setPostOwnerId] = useState(null);
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    if (route?.params?.openPrivateChatAlt) {
      setPostOwnerId(route.params.postOwnerId);
      setPostImage(route.params.postImageUri)
      setCurrentView('PrivateChatAlt');
    }
  }, [route?.params]);

  const goTo = (viewName) => setCurrentView(viewName);

  function goToPrivateChat(messageData) {
    setSelectedMessage(messageData);
    goTo('PrivateChat');
  }

  return (
    <>
      {currentView === 'MessagesList' && (
        <MessagesList
          navigation={navigation}
          onGoToPrivateChat={goToPrivateChat}
        />
      )}
      {currentView === 'PrivateChat' && selectedMessage && (
        <PrivateChat
          navigation={navigation}
          onBack={() => goTo('MessagesList')}
          messageData={selectedMessage}
        />
      )}
      {currentView === 'PrivateChatAlt' && (
        <PrivateChatAlt
          navigation={navigation}
          onBack={() => goTo('MessagesList')}
          postOwnerId={postOwnerId}
          postImage={postImage}
        />
      )}
    </>
  );
}