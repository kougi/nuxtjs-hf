import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const assets = {
  "/_nuxt/bootstrap-8f1a7532.mjs": {
    "type": "application/javascript",
    "etag": "\"3f8be-PxnrQzNWb2X11zTkcVhMyq55J7s\"",
    "mtime": "2022-01-23T20:08:16.086Z",
    "path": "../public/_nuxt/bootstrap-8f1a7532.mjs"
  },
  "/_nuxt/entry-84b60026.mjs": {
    "type": "application/javascript",
    "etag": "\"47-jcow1Mi9IPf1EXOuwlzm4p+r1UY\"",
    "mtime": "2022-01-23T20:08:16.086Z",
    "path": "../public/_nuxt/entry-84b60026.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"259-IN5B5jX+0o66QUxjZmJTRYgXlmc\"",
    "mtime": "2022-01-23T20:08:16.086Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/assets/bootstrap.664808d4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6770-i9Ym2BCUHt8Izw66HCXJPn63TA0\"",
    "mtime": "2022-01-23T20:08:16.086Z",
    "path": "../public/_nuxt/assets/bootstrap.664808d4.css"
  },
  "/_nuxt/assets/MessinaSansWeb-Regular.007a0750.woff": {
    "type": "font/woff",
    "etag": "\"7f2c-HKPoy3roV/pcHP634M5vDwu9P54\"",
    "mtime": "2022-01-23T20:08:16.086Z",
    "path": "../public/_nuxt/assets/MessinaSansWeb-Regular.007a0750.woff"
  },
  "/_nuxt/assets/MessinaSansWeb-Regular.af35c44f.woff2": {
    "type": "font/woff2",
    "etag": "\"6640-U/YzRcoxjMf/uWAE6DRXTYC0jzE\"",
    "mtime": "2022-01-23T20:08:16.086Z",
    "path": "../public/_nuxt/assets/MessinaSansWeb-Regular.af35c44f.woff2"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const PUBLIC_PATH = "/_nuxt/";
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "E:/server/wampstack-7.4.16-0/apache2/htdocs/nuxtjs-hf/dist" + "/" + "1642968489";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  if (!asset) {
    if (id.startsWith(PUBLIC_PATH) && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (id.startsWith(PUBLIC_PATH)) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
