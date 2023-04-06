export const socket = {
    wsclient: {} as WebSocket,
    init: function (): WebSocket | null {
        const webClientToken = localStorage.getItem('token') || '';
        if (webClientToken) {
            const access_token: string = JSON.parse(webClientToken).access_token;
            if (access_token) {
                this.wsclient = new WebSocket(
                    `${process.env.REACT_APP_SOCKET_DNS}:${process.env.REACT_APP_SOCKET_PORT}?authToken=` +
                        access_token,
                );
                return this.wsclient;
            }
            return null;
        }

        return null;
    },
};
