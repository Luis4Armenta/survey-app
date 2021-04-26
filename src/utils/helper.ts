function getToken (authorizationHeader: string): string {
  return authorizationHeader.split(' ')[1]
}

function hasAllTheParametersFilled (...objects: any[]): boolean {
  let response = true
  objects.forEach(item => {
    if (item === null || item === undefined || item === '' || item === 0) {
      response = false
    }
  })
  return response
}

export { getToken, hasAllTheParametersFilled }
