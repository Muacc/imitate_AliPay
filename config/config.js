// export const apiBaseUrl = window.location.origin + '/'//如果发布APP和小程序，这里window.location.origin需要改为您站点的域名，参考下面注释

// export const apiBaseUrl = 'https://luru.xinghaoruiye.cn/'//网站域名接口地址参考，发布小程序和APP时使用
export const apiBaseUrl = 'https://gjj.xinghaoruiye.cn/'//网站域名接口地址参考，发布小程序和APP时使用
export const h5Url = apiBaseUrl + "wap/" //H5端网站地址,
// export const h5Url = "http://localhost:8080/wap/" //H5端网站地址,

// #ifdef H5
export const baseUrl=process.env.NODE_ENV === 'development'?window.location.origin+'/':apiBaseUrl
// #endif
