# Security-Features-NodeJS

## Creating SSL/TLS Certificates in NodeJS
```
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.cert -out server.cert -days 365
```

- This is an OpenSSL command that generates a self-signed SSL certificate and private key in the PEM format. Here's what each option in the command does:

- req: This option specifies that the openssl command should be used for generating a certificate signing request (CSR) or a self-signed certificate.

- -x509: This option specifies that a self-signed certificate should be generated rather than a CSR.

- -newkey rsa:4096: This option generates a new RSA key pair with a key length of 4096 bits.

- -nodes: This option specifies that the private key should not be encrypted with a passphrase. This makes it easier to use the private key in automated scripts or in development environments, but it also means that anyone who has access to the private key file can use it to decrypt SSL/TLS traffic.

- -keyout key.cert: This option specifies the filename for the private key file. In this case, the file is named key.cert.

- -out server.cert: This option specifies the filename for the self-signed certificate file. In this case, the file is named server.cert.

- -days 365: This option sets the validity period of the certificate to 365 days (1 year). After this time, the certificate will expire and a new one will need to be generated.

  <p align="center">
  <img src="https://user-images.githubusercontent.com/104893311/222834827-ec79fd12-c06d-4881-a31a-043cf62ad2ca.png">
 </p>

In summary, this OpenSSL command generates a new RSA key pair with a key length of 4096 bits, uses it to generate a self-signed SSL certificate that is valid for 1 year, and saves the private key and certificate files to the current directory with the filenames key.cert and server.cert, respectively. Note that this command generates a self-signed certificate, which is not trusted by default and should only be used for development or testing purposes. For production use, it is recommended to obtain a trusted SSL certificate from a certificate authority (CA).


## Use of Helmet Package
```
npm i helmet
```

* The "helmet" package provides a collection of middleware functions, each of which sets a specific HTTP header that can help improve the security of your web application. For example, the "helmet.xssFilter()" middleware sets the "X-XSS-Protection" header to help prevent cross-site scripting attacks.

  <p align="center">
  <img src="https://user-images.githubusercontent.com/104893311/222834087-59808e7e-0594-4877-bb90-7b7672900b19.png">
 </p>
