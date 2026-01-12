export async function handleToggleBookmark(post, isSaved, setIsSaved, loadingSave, setLoadingSave, savePost, unsavePost, updatePostSaved) {
  if (loadingSave) return;
  try {
    setLoadingSave(true);
    if (isSaved) {
      await unsavePost(post.id);
      setIsSaved(false);
      updatePostSaved(post.id, false);
    } else {
      await savePost(post.id);
      setIsSaved(true);
      updatePostSaved(post.id, true);
    }
  }
  catch (error) {
    console.error('Erro ao salvar post:', error);
  }
  finally {
    setLoadingSave(false);
  }
}