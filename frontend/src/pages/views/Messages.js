import { useState } from 'react';
import MessagesList from './messagesViews/MessagesList';
import PrivateChat from './messagesViews/PrivateChat';

export default function Messages({ navigation }) {
  const [currentView, setCurrentView] = useState('MessagesList');
  const [selectedMessage, setSelectedMessage] = useState(null);

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
    </>
  );
}