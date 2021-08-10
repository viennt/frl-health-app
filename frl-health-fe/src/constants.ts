export const SERVER_URL = localStorage.getItem('server');
// 'http://localhost:3200';

export const askForServer = (currentServer) => {
  const server = prompt('Please enter api server', currentServer);
  if (server != null) {
    localStorage.setItem('server', server);
    location.reload();
  }
};
