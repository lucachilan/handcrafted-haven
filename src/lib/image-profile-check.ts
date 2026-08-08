const allowedExtensions = /\.(jpg|jpeg|png|webp|gif|svg)(?:$|[?#])/i;
const trustedHosts = [
    "static.wikia.nocookie.net",
  "images.unsplash.com",
  "avatars.githubusercontent.com",
  "instagram.com",
  "unsplash.com",
  "imgur.com",
  "pixabay.com",
]

function isImageUrl(url:string){
    try {
        const parsedUrl = new URL(url);
        const protocol = parsedUrl.protocol.toLowerCase();
    
        if (protocol !== "https:" && protocol !== "http:") {
          return false;
        }
    
        const pathName = parsedUrl.pathname.toLowerCase();
        const hostname = parsedUrl.hostname.toLowerCase();
    
        const hasImageExtension = allowedExtensions.test(pathName);
        const isTrustedImageHost = trustedHosts.some((host) => hostname.includes(host));
    
        return hasImageExtension || isTrustedImageHost;
      } catch {
        return false;
      }
}

export function normalizeUrl(rawUrl?:string|null){
    if(!rawUrl) {
        return null;
    }
    const value = rawUrl.trim();

    if(!value) {
        return null;
    }

    if(!isImageUrl(value)) {
        return null;
    }

    return new URL(value).toString();
}
