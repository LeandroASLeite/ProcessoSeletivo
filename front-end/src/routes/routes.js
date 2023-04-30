
class Routes {
  async getBackendData() {
    const response = await fetch('http://localhost:5000/api/read');
    const jsonData = await response.json();
    return jsonData;
  }

  async getEvent(time) {
    console.log(time)
    const data = {
      startDate: `${time.ano}-${(time.mes + 1).toString().padStart(2, "0")}-${time.dia.toString().padStart(2, "0")}T00:00:00.000Z`,
      finishDate: `${time.ano}-${(time.mes + 1).toString().padStart(2, "0")}-${time.dia.toString().padStart(2, "0")}T23:59:00.000Z`
    };
    console.log(data)
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

  async deleteData(id) {
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
