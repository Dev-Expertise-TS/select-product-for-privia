// Vite 개발 서버 플러그인으로 목업 API 제공
export default function mockServerPlugin() {
  return {
    name: 'mock-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Mock API endpoint
        const mockApiPattern = /^\/api\/(\d+)\/select-rooms-price\//;
        
        if (mockApiPattern.test(req.url)) {
          const matches = req.url.match(mockApiPattern);
          const sabreId = matches[1];
          
          // CORS headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.setHeader('Content-Type', 'application/json');
          
          // Mock response
          const mockData = {
            propertyNameKor: "프리비아 럭셔리 호텔",
            propertyNameEng: "Privia Luxury Hotel",
            destinationKor: "서울",
            destinationEng: "Seoul",
            cityKor: "서울",
            cityEng: "Seoul",
            paragonId: parseInt(sabreId),
            roomDescriptions: [
              {
                price: 250000,
                roomCode: "STD",
                roomName: "스탠다드 룸",
                roomDescription: "편안한 스탠다드 객실입니다.",
                cancelDeadLine: "20240314"
              },
              {
                price: 350000,
                roomCode: "DLX",
                roomName: "디럭스 룸",
                roomDescription: "넓고 쾌적한 디럭스 객실입니다.",
                cancelDeadLine: "20240314"
              }
            ]
          };
          
          res.end(JSON.stringify(mockData));
          return;
        }
        
        next();
      });
    }
  };
}