import { refreshUser } from '../api/User'

export function handleTokenExpired (err, axs) {
  // auth token refreshing
  if (+err?.response?.status === 401 && !err?.config?.isRetryRequest) {
    window.localStorage.removeItem('access_token')
    const refreshToken = window.localStorage.getItem('refresh_token')
    if (refreshToken) {
      return refreshUser({ refreshToken: refreshToken })
        .then(res => {
          const newToken = res.data.accessToken
          const newRefresh = res.data.refreshToken
          window.localStorage.setItem('access_token', newToken)
          window.localStorage.setItem('refresh_token', newRefresh)
          const retryConfig = Object.assign({}, err.config)
          retryConfig.isRetryRequest = true
          retryConfig.headers.Authorization = `Bearer ${newToken}`
          return axs(retryConfig)
        })
        .catch(err => {
          window.localStorage.removeItem('access_token')
          window.localStorage.removeItem('refresh_token')
          return Promise.reject(err)
        })
    } else {
      return Promise.reject(err)
    }
  } else {
    return Promise.reject(err)
  }
}