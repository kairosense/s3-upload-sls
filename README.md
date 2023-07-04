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

### Steps to Upload

1. Use Initalize Route

```json
@route - https://tj3rd82v0c.execute-api.ap-south-1.amazonaws.com/dev/initalize
@method - POST

@body - json {
  "filename": "test-upload.png"
}

@response - json {
  "fileId": "pYd1BDhCnIM1BuhA8tbOAyK0Z.C6jrETGkH9zYNdJzXuRJ9TdQnJNve5dBhxh1QwqtBJvny5HSTDiRHQHufjned0QEIKl6f.CJlj2E4UIz1WAP4QaZlACTH0DgLzalg4Csmwhjw9rLJ4seYyyPYRpcDhHR.ZrlZpIepwlXHB6rw-",
  "fileKey": "test-upload.png"
}
```

2. Use Response of `initialize` route and send it to `get-presigned-urls` with number of parts

```json
@route - https://tj3rd82v0c.execute-api.ap-south-1.amazonaws.com/dev/get-presigned-urls
@method - POST

@body - json {
    "fileId": "pYd1BDhCnIM1BuhA8tbOAyK0Z.C6jrETGkH9zYNdJzXuRJ9TdQnJNve5dBhxh1QwqtBJvny5HSTDiRHQHufjned0QEIKl6f.CJlj2E4UIz1WAP4QaZlACTH0DgLzalg4Csmwhjw9rLJ4seYyyPYRpcDhHR.ZrlZpIepwlXHB6rw-",
    "fileKey": "test-upload.png",
    "parts": 1
}

@response - json {
    "parts": [
        {
            "signedUrl": "https://upload-dev-artifacts.s3.ap-south-1.amazonaws.com/test-upload.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIASOIE6RUCVOOQFQPC%2F20230704%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230704T184338Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEAtS19NBsfcGesZWYEhzHuyqlkc%2FJ44tka4A40ZDiuCjYCIQDrqhGN%2BOXmT7iiqhDpfoAMqOmrYp3JFin8HVeVcB8bgyqMAwgcEAEaDDE2ODA1MDk4NjI0NSIMfPp2t2fFCSwqMWDMKukCZ9Gew0qtSABkUzRMWAnKQtWynqz6izOJfZ3lvVx%2BjmusTh8IODKn5KwkoJU5Q%2FoSRhHT6zmQN9ILhOftOVBVgNUzxOeAVir1Mqp8pzRtpUk6yoNwbIkChfDSFTLGPR4kU2dIsswTRXfC15owtk3G8MT0J7e%2BHo%2B7zUvbfKs0Pi8aZCitjz4d9xPloTYMfydq%2F8fDdS3kbNVHv5zDIL6qnE9MLNtSKejoFP03wXIDSq7ejU%2B177UQr5LPqHJpFsrnoDBjbNZZs05tnDxDy5gi7965rSpK1Ibb1jQMjB6JI0RkYy7OsskhoTjkT8oTBFuw2Yf7H6rZJkJYgGW0Qe9kr%2Fz%2Fwlu1s4xZuzg31aukEEMqtYtuYe7kXy6I9VMUwAPWw%2FXfBQlIydHKWmWogu14fD7RREtaigudEKlPcxCA0LhMp7LieNA5VNA%2F%2Fu3CRu6b7%2FL0t6so2gQ4GDWksr7OmsI3xioBPlbNkDDZ0JGlBjqcAQhDqld7G4QIUdvAYb0g9%2FC2P0vQdltFI6nDgqOCli4NQNOjPu2Ds1PIAoBu1H5VA6xPU3dh%2BZ87Gb%2FqFePVy5LuShmoLkvwr2JWxYJlK%2FTG2i3clFN%2Bt2shcDIKHkWpEGqIHLGwei3qB2EmaQppqmfvhgu0MI4NnQVuDrXT1r%2FNgsdTm5BbrMecF9%2Bw2on32ewHiRNaIwTVh3b55Q%3D%3D&X-Amz-Signature=7aacbb972b820d6d0ee4e92c41817caea9cc4793fc5b1c52d0fe4219c83e1579&X-Amz-SignedHeaders=host&partNumber=1&uploadId=pYd1BDhCnIM1BuhA8tbOAyK0Z.C6jrETGkH9zYNdJzXuRJ9TdQnJNve5dBhxh1QwqtBJvny5HSTDiRHQHufjned0QEIKl6f.CJlj2E4UIz1WAP4QaZlACTH0DgLzalg4Csmwhjw9rLJ4seYyyPYRpcDhHR.ZrlZpIepwlXHB6rw-&x-id=UploadPart",
            "PartNumber": 1
        }
    ]
}
```

3. Upload file on each presigned URLs

```json
@route - each-presigned-url-one-by-one
@method - PUT

@body - form {
  --form 'file=@"/C:/Users/Kairosense/Documents/test-sample-image.png"'
}

@response - {
  status_code: 200
  headers: {
    [
      {
        "key":"x-amz-id-2",
        "value":"1DWy7mzzvkG7wYhwOmv2/D07oLWcKxkaVvUa1Cedr2hyWfaJOgCmyJP/SYLiySiLkUR4JlnLUgI="
      },
      {
        "key":"x-amz-request-id",
        "value":"4GC8B5SD3AS3FDZ5"
      },
      {
        "key":"Date",
        "value":"Tue, 04 Jul 2023 18:44:11 GMT",
      },
      {
        "key":"ETag",
        "value":"\"382703a5ac9dbff67af87db5bc758b4a\""
      },
      {
        "key":"x-amz-server-side-encryption",
        "value":"AES256"
      }
    ]
  }
}

@note - Keep Track of ETag key in response headers
```

4. Call Finalize API in the last

```json
@route - hhttps://tj3rd82v0c.execute-api.ap-south-1.amazonaws.com/dev/finalize
@method - POST

@body - json {
    "fileId": "pYd1BDhCnIM1BuhA8tbOAyK0Z.C6jrETGkH9zYNdJzXuRJ9TdQnJNve5dBhxh1QwqtBJvny5HSTDiRHQHufjned0QEIKl6f.CJlj2E4UIz1WAP4QaZlACTH0DgLzalg4Csmwhjw9rLJ4seYyyPYRpcDhHR.ZrlZpIepwlXHB6rw-",
    "fileKey": "test-upload.png",
    "parts": [
        {
            "PartNumber": 1,
            "ETag": "382703a5ac9dbff67af87db5bc758b4a"
        }
    ]
}

@response - json {
    "s3Response": {
        "$metadata": {
            "httpStatusCode": 200,
            "requestId": "8V60RE7D1144XHGG",
            "extendedRequestId": "82c7MjNWPlcue713eeiG54zqR+8aWoWLlsQumdmwV+ncdHdzh23fYim7z+8Im6ukrX1ouRgiWBEz0AmAq+X1Kg==",
            "attempts": 1,
            "totalRetryDelay": 0
        },
        "ServerSideEncryption": "AES256",
        "Bucket": "upload-dev-artifacts",
        "ETag": "\"50451cd1d25bba87bc391f0971e234c8-1\"",
        "Key": "test-upload.png",
        "Location": "https://upload-dev-artifacts.s3.ap-south-1.amazonaws.com/test-upload.png"
    }
}
```