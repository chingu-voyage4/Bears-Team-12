const generateRandomUsername = () => {
  return 'Anon-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);  // assign a random anon username if none is present in profile
}

module.exports = generateRandomUsername;