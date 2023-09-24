# QRBeckn

QRBeckn was developed to address the challenges users face when trying to discover and access specific products and services within the Beckn ecosystem. The traditional process of manually searching through various Beckn Provider Partners (BPPs) for desired offerings can be time-consuming and overwhelming. QRBeckn streamlines this experience by leveraging QR codes to provide users with instant access to relevant product information, simplifying interactions and enhancing user satisfaction.

<img src="/pics/home-1.png" width="300" height="300" alt="Description">

## Why QRBeckn?

QRBeckn was conceived with the intention of creating a more user-centric and efficient way to engage with the Beckn ecosystem. The project recognizes the growing demand for simplicity and convenience in modern commerce interactions. By allowing users to scan QR codes associated with BPPs, QRBeckn eliminates the need for users to navigate through extensive lists of providers and offerings. This streamlined approach not only saves users time but also enhances their ability to quickly access and engage with the products and services they desire.

The motivation behind building QRBeckn lies in providing users with a tool that enhances their overall local commerce experience. By utilizing QR codes, the project aims to bridge the gap between users and BPPs, offering a seamless solution that aligns with contemporary preferences for instant and targeted interactions. QRBeckn's development is grounded in the aspiration to make commerce interactions within the Beckn ecosystem more intuitive, efficient, and user-friendly.

## Features

- Instant access to product information through QR code scanning.
- Simplified navigation of the Beckn ecosystem.
- Enhanced user satisfaction and efficiency in commerce interactions.

## Demo Links

- [Explore the Live Demo Site here](https://beckn-qr-code-generator.vercel.app/)
- [Watch How to use the Beckn QR-QR Platform through this Video](https://drive.google.com/file/d/1d8T7fjGNuMUhCLTK74BxUeDz8yEZXTNO/view?usp=sharing)

## Using Docker

#### Using Docker

**Step 1: Clone the Repository**

- Clone the repository to your local machine:

```bash
git clone https://github.com/roshangeorge97/beckn-qr-code-generator
cd beckn-qr-code-generator
```
**Step 2: Building Docker Images**

- To build the frontend image, use `docker build -t react-app .` for building frontend (run this command in the root of the project).
- To build the backend image, use `docker build -t api-server .` (this should be put in the `server` folder).

**Step 3: Running on your local machine**

- Finally, come back to the root of the folder and run `docker-compose up` to get the project running with your backend.

## Getting started
To get started with the Beckn QR-QR Interpretor, please try out the demo site at: https://beckn-qr-code-generator.vercel.app/

### Local Installation
To Run Beckn QR-QR Platform on your Local Machine, please follow the instructions below:

## Pre Installation Steps

Prerequisities

	1. Node > 14x
	3. NPM

Beckn QR-QR Platform has 2 parts 

	1. React client
	2. Node server
    
    
### Installing and running ReactJS client

### Step 1: Go to root directory

    npm install
    npm run dev
    
### Installing and running Node server

### Step 2: Go to ./server
  
    npm install
    npm run devel
    

## Documentations

- [Basic E-Comm API Endpoints of Beckn](https://github.com/roshangeorge97/beckn-qr-code-generator/blob/main/Existing%20API%20Endpoints.md)
- [Research for Search Building Block in Different Domains](https://github.com/roshangeorge97/beckn-qr-code-generator/blob/main/Exploring%20Search%20Building%20Block%20of%20Various%20Platforms.md)
- [Search Building Block Functionalities and Sequence Diagram](https://github.com/roshangeorge97/beckn-qr-code-generator/blob/main/Search%20building%20block%20functionalities%20and%20sequence%20diagram.md)

## Usage

Once QRBeckn is up and running, users can simply scan QR codes associated with Beckn Provider Partners to instantly access product information.

## Project Structure

``` bash
.eslintrc.cjs
.gitignore
DESIGN.md
Existing API Endpoints.md
Exploring Search Building Block of Various Platforms.md
LICENSE
README.md
Search building block functionalities and sequence diagram.md
index.html
package-lock.json
package.json
pics
   |-- C24-1.png
   |-- C24-2.png
   |-- CD1.png
   |-- CD2.png
   |-- PE1.png
   |-- PE2.png
   |-- amazon1.png
   |-- amazon2.png
   |-- dummy.md
   |-- meesho1.png
   |-- meesho2.png
   |-- userflow.png
postcss.config.js
public
   |-- QR Code (1).gif
   |-- QRCode.gif
   |-- beckn-logo.png
   |-- header-image.png
   |-- react.svg
   |-- vite.svg
server
   |-- package.json
   |-- server.js
   |-- vercel.json
src
   |-- App.css
   |-- App.jsx
   |-- components
   |   |-- FormData.jsx
   |   |-- LoadingOverlay.jsx
   |   |-- UI.jsx
   |-- index.css
   |-- main.jsx
tailwind.config.js
vercel.json
vite.config.js
```




