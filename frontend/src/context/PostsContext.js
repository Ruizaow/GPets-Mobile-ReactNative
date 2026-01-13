import { createContext, useContext, useState } from 'react';

const PostsContext = createContext({});

export function PostsProvider({ children }) {
  const [feedPosts, setFeedPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  function updatePostStatus(postId, status) {
    const update = posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, status }
          : post
      );
    setFeedPosts(prev => update(prev));
    setUserPosts(prev => update(prev));
    setBookmarkedPosts(prev => update(prev));
  }

  function updatePostSaved(postId, isSaved) {
    const update = posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, isSaved }
          : post
      );
    setFeedPosts(prev => update(prev));
    setUserPosts(prev => update(prev));

    if (isSaved) {
      const post =
        feedPosts.find(p => p.id === postId) ||
        userPosts.find(p => p.id === postId);

      if (post) {
        setBookmarkedPosts(prev =>
          prev.some(p => p.id === postId)
            ? prev
            : [...prev, { ...post, isSaved: true }]
        );
      }
    } else {
      setBookmarkedPosts(prev =>
        prev.filter(p => p.id !== postId)
      );
    }
  }

  function removePost(postId) {
    setFeedPosts(prev => prev.filter(post => post.id !== postId));
    setUserPosts(prev => prev.filter(post => post.id !== postId));
    setBookmarkedPosts(prev => prev.filter(post => post.id !== postId));
  }

  return (
    <PostsContext.Provider
      value={{
        feedPosts,
        setFeedPosts,
        userPosts,
        setUserPosts,
        bookmarkedPosts,
        setBookmarkedPosts,
        updatePostStatus,
        updatePostSaved,
        removePost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}