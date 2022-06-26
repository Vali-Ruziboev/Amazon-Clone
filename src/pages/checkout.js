import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems } from "../slices/basketSlice";

const Checkout = () => {
    const items = useSelector(selectItems)

    return (  
        <div className="bg-gray-100">
            <Head>
                <title>Amazon | Checkout</title>
            </Head>
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image 
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                        {items.length===0?'Your Shopping Basket is Empty':'Shopping Basket'}</h1>
                    </div>
                </div>


                {/* Right */}
                <div>

                </div>
            </main>
        </div>
    );
}
 
export default Checkout;