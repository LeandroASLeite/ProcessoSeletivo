
class Routes {
    async getBackendData() {
        const response = await fetch('http://localhost:5000/api/read');
        const jsonData = await response.json();
        return jsonData;
    }

    async getEvent() {

        const data = { startDate: '2021-04-21T01:00:00.000Z', finishDate: '2023-04-28T01:01:00.000Z' };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:5000/api/readTime', requestOptions)
        const jsonData = await response.json();
        return jsonData;
    }

    async createData(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:5000/api/create', requestOptions)
        const jsonData = await response.json();
        
        return jsonData;
    }
  
    async  deleteData(id) {
        try {
          const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
            method: 'DELETE',
          });
          
          const jsonData = await response.json();
          return jsonData;
        } catch (error) {
          console.error(error);
          
          return { success: false, message: 'Não foi possível deletar o registro. Verifique se o ID informado é válido.' };
        }
        
      }









}
export default Routes
