class ApiResponse {
  constructor(status, data, message = "Sucess") {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}


export {ApiResponse}