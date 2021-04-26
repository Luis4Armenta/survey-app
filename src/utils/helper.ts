function getToken (authorizationHeader: string): string {
  return authorizationHeader.split(' ')[1]
}

export default getToken
