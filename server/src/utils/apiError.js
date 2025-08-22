class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.success = status < 400;
    this.status = status;
  }
}

export { ApiError };
