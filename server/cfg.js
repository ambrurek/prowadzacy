
  const currentDate = new Date();
  const currentYear =  currentDate.getFullYear();

const config = {
  API_URL: 'http://localhost:5000', // Adres API back-endu
  FRONTEND_URL: 'http://localhost:3001', // Adres front-endu
  SEMESTERS: [
    {
      name: 'Semester 1',
      start: new Date(currentYear, 0, 1), // Początek pierwszego semestru
      end: new Date(currentYear, 5, 30), // Koniec pierwszego semestru
    },
    {
      name: 'Semester 2',
      start: new Date(currentYear, 6, 1), // Początek drugiego semestru
      end: new Date(currentYear, 11, 31), // Koniec drugiego semestru
    },
  ],
};

module.exports = config;