import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"be1-NmdYAOeiBJ+xONrNbetscfmsIrk\"",
    "mtime": "2022-01-25T14:31:46.000Z",
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"1c55-5CVpS1vFIppdUJWe7bPmv8DUVmU\"",
    "mtime": "2022-01-25T14:31:47.000Z",
    "path": "../public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"b1a-/16+3tFgO0Ey9LtHkpgKb/J4VlU\"",
    "mtime": "2022-01-25T14:31:47.000Z",
    "path": "../public/apple-touch-icon.png"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"318-Q3ES0upscR6sWQMBj2s7xpH8DhE\"",
    "mtime": "2022-01-25T14:31:47.000Z",
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"55c-7t2rh2eIOc8ALRoU3Xil/5/pI10\"",
    "mtime": "2022-01-25T14:31:47.000Z",
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-XscMIbE0FU9UHQ3EBQakh7vujCQ\"",
    "mtime": "2022-01-25T14:31:48.000Z",
    "path": "../public/favicon.ico"
  },
  "/mstile-150x150.png": {
    "type": "image/png",
    "etag": "\"ad7-t7vADeUCZy+fLbj1oQETUb5lzSs\"",
    "mtime": "2022-01-25T14:31:48.000Z",
    "path": "../public/mstile-150x150.png"
  },
  "/safari-pinned-tab.svg": {
    "type": "image/svg+xml",
    "etag": "\"21db-X9Jj53c15g3E2kOS9ruuMqS3lH4\"",
    "mtime": "2022-01-25T14:31:48.000Z",
    "path": "../public/safari-pinned-tab.svg"
  },
  "/_nuxt/bootstrap-3a0682c4.mjs": {
    "type": "application/javascript",
    "etag": "\"405aa-cLp8j8um31qAl85/RyCF8oEBubI\"",
    "mtime": "2022-01-27T09:56:26.567Z",
    "path": "../public/_nuxt/bootstrap-3a0682c4.mjs"
  },
  "/_nuxt/bootstrap.4d41fff4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a18-bb0c0g5YFRhm+MyzpeTRh0Fv7SM\"",
    "mtime": "2022-01-27T09:56:26.567Z",
    "path": "../public/_nuxt/bootstrap.4d41fff4.css"
  },
  "/_nuxt/entry-f9cfd047.mjs": {
    "type": "application/javascript",
    "etag": "\"47-+vNJ9YWjFPgrbS09M0BYK4m/h3Q\"",
    "mtime": "2022-01-27T09:56:26.567Z",
    "path": "../public/_nuxt/entry-f9cfd047.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"254-mcGp2XWubi4O3wiNXqt3tbxYFZg\"",
    "mtime": "2022-01-27T09:56:26.570Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/MessinaSansWeb-Regular.af35c44f.woff2": {
    "type": "font/woff2",
    "etag": "\"ba29-nF214v1RRVMjkDRwQuOuZZ3Qfow\"",
    "mtime": "2022-01-27T09:56:26.567Z",
    "path": "../public/_nuxt/MessinaSansWeb-Regular.af35c44f.woff2"
  },
  "/_nuxt/thirdway.28d78779.svg": {
    "type": "image/svg+xml",
    "etag": "\"3138-SHh212D3kZSBIcEXBgnCVNuwXzc\"",
    "mtime": "2022-01-27T09:56:26.567Z",
    "path": "../public/_nuxt/thirdway.28d78779.svg"
  },
  "/_nuxt/txo_logo.d1de97a4.svg": {
    "type": "image/svg+xml",
    "etag": "\"23b-uzV7AkaOVXZZb9zfw5eFP6GIYp0\"",
    "mtime": "2022-01-27T09:56:26.567Z",
    "path": "../public/_nuxt/txo_logo.d1de97a4.svg"
  },
  "/assets/fonts/MessinaSansWeb-Regular.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"76c8-jVe+0ByybzN35XECVHdq+F69Znk\"",
    "mtime": "2020-04-26T08:35:32.000Z",
    "path": "../public/assets/fonts/MessinaSansWeb-Regular.eot"
  },
  "/assets/fonts/MessinaSansWeb-Regular.woff": {
    "type": "font/woff",
    "etag": "\"7f2c-HKPoy3roV/pcHP634M5vDwu9P54\"",
    "mtime": "2020-04-26T08:35:28.000Z",
    "path": "../public/assets/fonts/MessinaSansWeb-Regular.woff"
  },
  "/assets/fonts/MessinaSansWeb-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"6640-U/YzRcoxjMf/uWAE6DRXTYC0jzE\"",
    "mtime": "2020-04-26T08:35:32.000Z",
    "path": "../public/assets/fonts/MessinaSansWeb-Regular.woff2"
  },
  "/assets/fonts/MessinaSans_Regular_ReadMe.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"b63-J9Ym+VIHJan1PefoKmYz3k0WfcA\"",
    "mtime": "2019-02-22T01:43:32.000Z",
    "path": "../public/assets/fonts/MessinaSans_Regular_ReadMe.html"
  },
  "/assets/img/thirdway.svg": {
    "type": "image/svg+xml",
    "etag": "\"3138-SHh212D3kZSBIcEXBgnCVNuwXzc\"",
    "mtime": "2022-01-25T11:11:26.360Z",
    "path": "../public/assets/img/thirdway.svg"
  },
  "/assets/img/txo_logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"23b-uzV7AkaOVXZZb9zfw5eFP6GIYp0\"",
    "mtime": "2022-01-19T16:40:08.323Z",
    "path": "../public/assets/img/txo_logo.svg"
  },
  "/assets/img/txo_logo_2.svg": {
    "type": "image/svg+xml",
    "etag": "\"38a-ts+9m+vztO5/3RyyiMYOwxYgDU0\"",
    "mtime": "2020-07-23T12:05:10.000Z",
    "path": "../public/assets/img/txo_logo_2.svg"
  },
  "/assets/scss-delete/mixins.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2022-01-22T12:07:16.888Z",
    "path": "../public/assets/scss-delete/mixins.scss"
  },
  "/assets/scss-delete/_main.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"3f1b-ZicWWePAIQF7+2vKa41UlYK4qbk\"",
    "mtime": "2022-01-25T14:23:06.649Z",
    "path": "../public/assets/scss-delete/_main.scss"
  },
  "/assets/scss-delete/_sass-variables.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"a1-rZKRBQr5o+lPNHaBejIR+9d0b0s\"",
    "mtime": "2022-01-23T14:12:58.301Z",
    "path": "../public/assets/scss-delete/_sass-variables.scss"
  },
  "/assets/scss-delete/_variables.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"866-G47U0YWt4wHmp3+jNEzAImiMCxU\"",
    "mtime": "2022-01-24T19:09:07.694Z",
    "path": "../public/assets/scss-delete/_variables.scss"
  },
  "/assets/img/carousel-images/c1.jpg": {
    "type": "image/jpeg",
    "etag": "\"3d9c2-Z68zR7iPuUGvpvqrwTo9hNRjaEU\"",
    "mtime": "2021-01-07T18:28:38.000Z",
    "path": "../public/assets/img/carousel-images/c1.jpg"
  },
  "/assets/img/carousel-images/c2.jpeg": {
    "type": "image/jpeg",
    "etag": "\"43d32-uXKAdSYgsytJdGRF0tVaokNa8Og\"",
    "mtime": "2021-01-07T18:27:48.000Z",
    "path": "../public/assets/img/carousel-images/c2.jpeg"
  },
  "/assets/img/carousel-images/c3.jpeg": {
    "type": "image/jpeg",
    "etag": "\"72a8e-Es2A+Qjz7SG0Rnh3TczpkyLLz8M\"",
    "mtime": "2021-01-07T18:28:16.000Z",
    "path": "../public/assets/img/carousel-images/c3.jpeg"
  },
  "/assets/img/carousel-images/c4.jpeg": {
    "type": "image/jpeg",
    "etag": "\"6281a-8RJ6oMFJ78NMjfNR1pKJQx1jhw4\"",
    "mtime": "2021-01-07T18:28:24.000Z",
    "path": "../public/assets/img/carousel-images/c4.jpeg"
  },
  "/assets/img/carousel-images/c5.jpeg": {
    "type": "image/jpeg",
    "etag": "\"6e9cd-T69tgoBqo49omjP5yIKwDlVC0gI\"",
    "mtime": "2021-01-07T18:28:30.000Z",
    "path": "../public/assets/img/carousel-images/c5.jpeg"
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
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/E:/server/wampstack-7.4.16-0/apache2/htdocs/nuxtjs-hf/dist" + "/" + "1643277380";
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
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
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
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
