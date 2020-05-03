# Covid-19 Solution

## Getting Started
To setup the environment and get the code running follow the steps below.

### Built With
Major Frameworks that this project is built on.
* [Watson ML](https://www.ibm.com/in-en/cloud/machine-learning)
* [Watson Visual Recognition](https://www.ibm.com/in-en/cloud/watson-visual-recognition)
* [Watson Assistant](https://www.ibm.com/cloud/watson-assistant/)
* [Watson Discovery](https://www.ibm.com/in-en/cloud/watson-discovery)
* [Nodejs](https://nodejs.org/en/)
* [Angular 8](https://angular.io/)
* [Flask Server](https://flask.palletsprojects.com/en/1.1.x/)

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
    * First download and install [NodeJS](https://nodejs.org/en/) from the official site and run     the bellow command to update to the latest version.
    ```sh
    npm install npm@latest -g
    ```
* Angular
    * To install the required packages for angular code to run make sure that you have NodeJS and Angular CLI installed. To install Angular CLI run the following command.
    ```sh
    npm install -g @angular/cli
    ```
* MongoDB
    * To get the login and registeration working you must have mongoDB installed. Install [MongoDB](https://www.mongodb.com/download-center/community) from the official site.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/arnavgarg123/Covid19Dashboard.git
   ```
2. Install NPM packages
    1. Inside Covid19Dashboard Directory run -
        ```sh
        npm install
        ```
    2. Inside Covid19Dashboard/server directory run - 
        ```sh
        npm install
        ```
3. Install Python packages
    ```sh
    conda install flask
    ```
    ```sh
    conda install pytorch=1.2.0 torchvision=0.4.0 -c pytorch
    ```
    ```sh
    conda install -c https://conda.binstar.org/menpo opencv
    ```
    ```sh
    conda install pillow=6.1
    ```
4. Setup MongoDB by creating a `database` named Covid and 2 collections -`location` and `user`. To access admin functionallity make sure to add a user with `email` as `admin` and any password in feild `Password`.
# Usage
After completeing the installation follow the steps below to get the app up and running. 
1. Run the Python server located in Covid19Dashboard/server/pyserver directory.
    ```sh
    python proximity.py
    ```
2. Run the NodeJS server located in Covid19Dashboard/server directory.
    ```sh
    node index.js
    ```
3. Run the Angular 8 code inside Covid19Dashboard directory.
    ```sh
    ng serve --proxy-config proxy.conf.json
    ```
