# Fatec Estágios Web App

The Fatec Estágios Web App is a React-based web application that consumes the [Fatec Estágios API](https://github.com/lotaviods/link-fatec-api).

This application allows users to access and interact with the API's data, providing a seamless user experience for managing internships and related information.
Installation and Setup


To run the Fatec Estágios Web App locally, follow these steps:

Clone the repository:

```bash
git clone git@github.com:lucas-devFull/link-fatec.git

```

```bash
cd fatec-estagios-web-app
```

copy env-example to .env:

```bash
cp env-example .env
```

Check and modify the .env file to set the required environment variables


Replace the values with your preferred configuration. These environment variables will be used to configure the application correctly.

# Using Docker Compose

The Fatec Estágios Web App is also configured to run using Docker Compose, making it easy to deploy the application in a containerized environment. To use Docker Compose, follow these additional steps:

    Ensure you have Docker and Docker Compose installed on your system.

    Build the Docker image:

```bash
docker-compose build
```
Run the Docker container:

```bash
docker-compose up
```
The web app will be accessible at http://localhost:3001 (or any other port specified in the .env file as LINK_FATEC_PORT).
Usage

Once the Fatec Estágios Web App is up and running, open your web browser and go to the URL where the application is hosted (e.g., http://localhost:3001). You will be presented with the main interface, allowing you to interact with the Fatec Estágios API and view the data.
Contributing

If you would like to contribute to the Fatec Estágios Web App, feel free to fork the repository and submit pull requests with your changes. We welcome any improvements or bug fixes that can enhance the overall user experience.
License

The Fatec Estágios Web App is licensed under the MIT License. Feel free to use, modify, and distribute the application according to the terms specified in the license.
Support

For any issues or questions regarding the Fatec Estágios Web App, please open an issue on the GitHub repository. We will do our best to address and resolve the problem promptly.