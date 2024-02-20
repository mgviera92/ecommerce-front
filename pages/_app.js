import { createGlobalStyle } from "styled-components"
import '@/pages/css/main.css'
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`

`;


export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <CartContextProvider>
                <Component {...pageProps} />
            </CartContextProvider>
        </>
    )
}