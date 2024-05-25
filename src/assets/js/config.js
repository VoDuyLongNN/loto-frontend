const url_base = "http://localhost:8080"

export const API_URLS = [
   {
      name: 'auth',
      urls: [
         {
            subName: 'register',
            url: `${url_base}/auth/register`
         },
         {
            subName: 'login',
            url: `${url_base}/auth/login`
         }
      ],
   },
   {
      name: 'rooms',
      urls: [
         {
            subName: 'create',
            url: `${url_base}/rooms/create/:userID`
         },
         {
            subName: 'room',
            url: `${url_base}/rooms/:roomID`
         },
         {
            subName: 'count',
            url: `${url_base}/rooms/:roomID/count`
         },
         {
            subName: 'join',
            url: `${url_base}/rooms/join`
         }
      ]
   }
]