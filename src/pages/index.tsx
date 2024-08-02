import Layout from "@/app/layout";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";


const Home: NextPageWithLayout = () => {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        
        
        
        </main>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default Home;