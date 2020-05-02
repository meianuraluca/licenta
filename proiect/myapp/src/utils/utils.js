const getClaims = accessToken => {
    if (!accessToken) return {};
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };
export default getClaims;