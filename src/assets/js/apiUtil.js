import { API_URLS } from './config';

export function findApiByName(apiName, subName) {
  const apiGroup = API_URLS.find(apiGroup => apiGroup.name === apiName);

  if (apiGroup) {
      return apiGroup.urls.find(api => api.subName === subName);
  }
  return null;
}
