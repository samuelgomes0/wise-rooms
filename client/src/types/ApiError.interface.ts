interface ApiError {
  response: {
    data: {
      code: string;
      message: string;
    };
  };
}

export default ApiError;
