# React Data Visualization App

## Overview 📚

This application serves as a comprehensive data visualization platform. The app is designed with functionalities to:
- Parse and display data from CSV files.
- Use SQL-like queries for searching, powered by the `alasql` library.
- Offer paginated data viewing.
- Render an advanced table format with custom columns.
- Apply dynamic filters to visualize data.

## Technologies Used 💻

- **React**: The main framework.
- **Key Packages**:
- - `TailwindCss`: Writing Css.
  - `papaparse`: CSV parsing.
  - `alasql`: SQL-like data querying.
  - `react-hot-toast`: Notification pop-ups.
  - `moment`: Date manipulation.
  - `@fortawesome/react-fontawesome` & `@fortawesome/free-solid-svg-icons`: Icon display.
  - `react-window`: Efficiently rendering large lists.

## Features 🌟

### SQL-based Search
The `SearchBar` component supports SQL-like queries for data filtering.

### Dynamic Pagination
The `Pagination` component helps users navigate large datasets seamlessly.

### Data Filtering
The `FilterBar` lets users adjust the data source dynamically using UI (Not the best version but still work in progress).

### Advanced Data Visualization
The `Table` component provides a rich visualization, with custom renderers for distinct data columns.

## 🕒 Load Time Measurement
![image](https://github.com/rituraj2000/atlan_submission/assets/83244005/0c9392ff-9ae6-4037-a0f1-e72f609bfa99)
![image](https://github.com/rituraj2000/atlan_submission/assets/83244005/dd9755c0-679d-4851-97c9-d91f2cd163de)


I have employed the Browser Developer Tools, mainly in Google Chrome, to measure our page's load time:

- **Total Load Time**: Open Developer Tools (`Ctrl + Shift + J` / `Cmd + Option + J` on macOS) > Go to `Network` tab > Refresh the page. The bottom provides a summary of the full loading time.
  
- **Resource Load Time**: Within the `Network` tab, the load time for each resource (images, scripts, stylesheets, etc.) is listed, allowing us to identify potential bottlenecks.

This data aids us in optimizing our application for speed and efficiency.

## Performance & Optimization ⚡

- **Paging**: To enhance responsiveness and efficiency, especially for hefty datasets, I implemented pagination. This ensures that only a subset of data is loaded and rendered at any given time, reducing the 
              rendering burden and improving user experience.
- **React Window(Attempted, not implemented in the final version)**: I attempted to utilize `react-window` for optimized rendering, especially with large datasets. However, it did not meet our specific requirements for the final version.

