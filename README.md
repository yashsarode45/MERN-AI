# AITOOLS - MERN Web Application
 
## Table of Contents
- [Overview](#overview)
- [Preview](#preview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [AI Image Generation](#ai-image-generation)
- [Text Summarization and Translation](#text-summarization-and-translation)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview
AITOOLS is a powerful MERN stack web application that offers two primary functions: AI image generation and text summarization and translation. This project leverages Node.js, Express.js, MongoDB, and React.js to provide a seamless user experience for both creative image generation and efficient text processing.

## Preview
[View Live Demo](https://mern-ai-mauve.vercel.app/)

![image](https://github.com/yashsarode45/MERN-AI/assets/65209607/b123204d-8dd7-4dd9-a443-2793117f097c)
![image](https://github.com/yashsarode45/MERN-AI/assets/65209607/9edd19e3-60bc-4adf-bcb5-b3acfdcfa84e)
![image](https://github.com/yashsarode45/MERN-AI/assets/65209607/b5bb770b-e925-4320-945a-0d628be8685b)
![image](https://github.com/yashsarode45/MERN-AI/assets/65209607/95468025-e8ae-4050-b4ce-09d2a7e9094d)
![image](https://github.com/yashsarode45/MERN-AI/assets/65209607/0fea4e7f-9175-4bcf-88d0-6e62fe72dc3b)
![image](https://github.com/yashsarode45/MERN-AI/assets/65209607/6d160c68-39cb-42e9-a49f-d5f82666a8cd)




## Features

### Homepage
- Displays a grid of previously generated AI images.
- Hovering over images reveals additional information: the generator's name, the prompt used, and the model used.
- Allows users to download generated images.

### Header
- Contains a logo on the left side.
- Provides two main buttons: "Create" and "Summarize."
- Clicking "Create" redirects to the image generation page.
- Clicking "Summarize" redirects to the text summarization and translation page.

### Image Generation Page
- Offers a form for users to input their preferences:
  - Name
  - Prompt
  - Model (selected from a dropdown)
- Displays the generated image along with a spinner during generation.
- Provides a "Share with Community" button to save the generated image and its related data to the MongoDB database.
- Redirects users to the homepage with the newly generated image displayed first in the grid.

### Text Summarization and Translation Page
- Supports three main functionalities:
  1. Summarization from input URL or text (paragraph), with the output displayed below.
  2. Summarization and translation from input URL or text (paragraph).
  3. Translation from input text.
- Saves user history using local storage, allowing quick access to previously processed text data.
- Offers the ability to copy summarized or translated text to the clipboard.

## Technologies Used

- **Node.js and Express.js**: For server-side development and API endpoints.
- **MongoDB**: As the database for storing generated images and related data.
- **React.js**: For building the responsive and dynamic user interface.
- **Tailwind CSS**: To create a beautiful and responsive UI with a glass morphism design.
- **Hugging Face Models**: Deep learning models for generating images from text input.
- **Cloudinary**: A cloud-based image storage service for managing and serving images efficiently.

## Project Structure

The project is organized as follows:

- `server`: Contains server-side code, including API routes and database configuration.
- `client`: Contains the React.js front-end code and UI components.
- `models`: Defines MongoDB schemas for storing image and text data.
- `utils`: Contains utility functions and configuration files.
- `public`: Holds static assets and the HTML template for the React app.

## AI Image Generation

The AI image generation feature allows users to input their preferences, including a name, prompt, and model choice. The generated image is displayed with a spinner during processing and can be shared with the community.

## Text Summarization and Translation

The text processing feature offers three main functions: summarization, summarization with translation, and translation. Users can input text or URLs to receive concise summaries or translations, making it a powerful tool for content analysis and language translation tasks.

## Contributing
Contributions to this project are welcome. Please follow best practices for code quality, documentation, and testing when submitting pull requests.

### Enjoy using AITOOLS for AI image generation, text summarization, and translation!
