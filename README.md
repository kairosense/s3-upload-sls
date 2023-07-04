# Express Node and Serverless Framework Template

### Local development

> To start seperate nodejs server instance.

```bash
npm run start:node
```

> To start serverless functions

```bash
npm run start:sls
```

### Lambda - Upload (dev)

```yaml
# ✔ Service deployed to stack sls-upload-media-dev (37s)

endpoints:
  - POST: https://tj3rd82v0c.execute-api.ap-south-1.amazonaws.com/dev/initalize

  - POST: https://tj3rd82v0c.execute-api.ap-south-1.amazonaws.com/dev/get-presigned-urls

  - POST: https://tj3rd82v0c.execute-api.ap-south-1.amazonaws.com/dev/finalize


functions:
  upload: sls-upload-media-dev-upload (502 kB)
```