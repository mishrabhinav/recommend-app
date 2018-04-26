export const accessTokenSelector =  (state) => state.getIn(['auth', 'accessToken']);
export const tokenTypeSelector =  (state) => state.getIn(['auth', 'tokenType']);
