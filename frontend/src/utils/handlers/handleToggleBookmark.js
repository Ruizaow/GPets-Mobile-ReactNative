export async function handleToggleBookmark(post, isSaved, setIsSaved, loadingSave, setLoadingSave, savePost, unsavePost) {
  if (loadingSave) return;
  try {
    setLoadingSave(true);
    if (isSaved) {
      await unsavePost(post.id);
      setIsSaved(false);
    } else {
      await savePost(post.id);
      setIsSaved(true);
    }
  } catch (err) {
    console.error('Erro ao salvar post:', err);
  } finally {
    setLoadingSave(false);
  }
}