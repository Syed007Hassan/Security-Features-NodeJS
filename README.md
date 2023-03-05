# Security-Features-NodeJS

## Creating SSL/TLS Certificates in NodeJS

```sh
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

```sh
npm i helmet
```

- The "helmet" package provides a collection of middleware functions, each of which sets a specific HTTP header that can help improve the security of your web application. For example, the "helmet.xssFilter()" middleware sets the "X-XSS-Protection" header to help prevent cross-site scripting attacks.

 <p align="center">
 <img src="https://user-images.githubusercontent.com/104893311/222834087-59808e7e-0594-4877-bb90-7b7672900b19.png">
</p>

## OAUTH and Web Tokens

- OAuth (Open Authorization) is an open-standard authorization protocol that allows third-party applications to access user data from an API without sharing the user's login credentials. OAuth is commonly used in web and mobile applications to allow users to sign in with their existing accounts from other services such as Google, Facebook, or Twitter.
- In Node.js, there are several OAuth libraries available that you can use to implement OAuth functionality in your application. These libraries provide an easy way to handle OAuth authentication and authorization flow, including generating access tokens, refreshing access tokens, and revoking access tokens.
- One popular library for OAuth in Node.js is passport which is a flexible authentication middleware that supports a variety of authentication mechanisms including OAuth. Passport allows you to integrate OAuth authentication with your application using various OAuth providers such as Google, Facebook, Twitter, and many more. It simplifies the OAuth process by handling the complex authentication and authorization flow and providing a standardized way to integrate with different OAuth providers.

<p align="center">
  <img src="https://images.ctfassets.net/cdy7uua7fh8z/2nbNztohyR7uMcZmnUt0VU/2c017d2a2a2cdd80f097554d33ff72dd/auth-sequence-auth-code.png">
 </p>

```sh
npm i passport passport-google-oauth20
```

