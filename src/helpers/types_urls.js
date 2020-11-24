const types_urls = {
  post: '/',
  page: '/',
  custom: '',
}

export function contentTypeToFrontUrl(typeObject) {
  let type = typeObject.type
  let rest = typeObject.slug
  if(typeObject.type === "post_type") {
    type = typeObject.object
    rest = rest.replace(process.env.SAPPER_APP_API_MAIN, '')
  }
  if(typeObject.type === "custom") {
    rest = typeObject.url
  }

  return `${types_urls[type]}${rest}`
}
