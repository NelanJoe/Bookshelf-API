exports.success = (status, message, data) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};

exports.successWithoutMessage = (status, data) => {
  return {
    status: status,
    data: data,
  };
};

exports.successWithoutData = (status, message) => {
  return {
    status: status,
    message: message,
  };
};

exports.error = (status, message) => {
  return {
    status: status,
    message: message,
  };
};
