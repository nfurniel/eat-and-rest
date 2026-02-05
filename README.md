# Eat and Rest

Welcome to **Eat and Rest**, a modern web application designed to help users discover favorable hotels and restaurants in specific locations. This platform combines an intuitive search interface, detailed establishment information, real-time weather updates, and an interactive map to provide a seamless user experience for travelers and foodies alike.

## 🚀 Features

-   **Smart Search**: Easily find hotels and restaurants by city or region.
-   **Interactive Map**: Visualize search results on a dynamic map powered by Leaflet.
-   **Detailed Listings**: View comprehensive information about each establishment, including amenities, ratings, and descriptions.
-   **Real-time Weather**: Check the current weather conditions for the selected location to plan your visit better.
-   **Reservation System**: Simple interface to initiate booking or reservation requests (Simulation).
-   **Responsive Design**: Optimized for a great experience on both desktop and mobile devices.

## 🛠️ Technologies Used

This project is built using a robust stack of modern web technologies:

-   **[React](https://react.dev/)**: Frontend library for building the user interface.
-   **[Vite](https://vitejs.dev/)**: Next Experience frontend tooling for fast builds and hot module replacement.
-   **[React Router DOM](https://reactrouter.com/)**: For handling client-side routing and navigation.
-   **[Leaflet](https://leafletjs.com/)** & **[React Leaflet](https://react-leaflet.js.org/)**: For rendering interactive maps.
-   **CSS Modules**: For scoped and maintainable styling.

## 📦 Installation & Setup

Follow these steps to get a local copy of the project up and running:

### Prerequisites

-   Use **Node.js** (v16 or higher recommended).
-   Use **npm** or **yarn** as your package manager.

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/eat-and-rest.git
    cd eat-and-rest
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in your browser**
    Navigate to `http://localhost:5173` (or the URL shown in your terminal).

## 📂 Project Structure

A quick look at the top-level files and directories:

```text
src/
├── componentes/      # Reusable UI components (Header, Footer, Cards, Map, etc.)
├── paginas/          # Page components (Home, Search, Details, Reservations)
├── App.jsx           # Main application entry point and routing setup
├── main.jsx          # React DOM rendering
└── index.css         # Global styles
```

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvement ideas, please fork the repo and create a pull request.
