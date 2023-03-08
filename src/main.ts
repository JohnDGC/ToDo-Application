/* Entry point application */
import app from "./app/app";
import './assets/scss/main.scss';
import './app/ui/todoWeb/scss/style.scss';

// app.startMyAppConsole();
app.initWebApplication('root').initComponents();
