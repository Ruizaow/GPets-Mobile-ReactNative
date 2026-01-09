const date = new Date();
date.setHours(date.getHours() - 3);

export const formattedTimestamp = `${date.toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})} - ${date.toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})}`;

export const formattedTimestampOnlyDate = `${date.toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})}`;