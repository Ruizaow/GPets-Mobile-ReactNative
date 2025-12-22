import { useState } from 'react';
import MessagesList from './messagesViews/MessagesList';
import PrivateChat from './messagesViews/PrivateChat';

export default function Messages({ navigation }) {
  const [view, setView] = useState('MessagesList');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const goTo = (viewName) => setView(viewName);

  function goToPrivateChat(messageData) {
    setSelectedMessage(messageData);
    goTo('PrivateChat');
  }

  return (
    <>
      {view === 'MessagesList' && (
        <MessagesList
          navigation={navigation}
          onGoToPrivateChat={goToPrivateChat}
        />
      )}
      {view === 'PrivateChat' && selectedMessage && (
        <PrivateChat
          onBack={() => goTo('MessagesList')}
          messageData={selectedMessage}
        />
      )}
    </>
  );
}