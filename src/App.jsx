import { Toaster } from "react-hot-toast";
import Card from "./components/Card";
import Header from "./components/Header";
import { PreSaleProvider } from "./context/PreSaleContext";

export default function App() {
  return (
    <PreSaleProvider>
      <div className="container lg:max-w-7xl mx-auto px-3 lg:px-0 pb-10">
        <Header />
        <Card />
        <Toaster containerStyle={{ zIndex: 999999 }} />
      </div>
    </PreSaleProvider>
  );
}
