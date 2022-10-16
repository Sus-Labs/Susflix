import Head from "next/head";

export interface Props {
    children?: any;
}

const Layout: React.FC<Props> = (props) => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="icon.png" type="image/x-icon" />
            </Head>
            {props.children}
        </>
    );
};

export default Layout;
