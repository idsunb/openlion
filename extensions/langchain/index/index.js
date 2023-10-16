import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';


const Home = React.lazy(() => import('./home'));
const WebScraper = React.lazy(() => import('../parts/webscraper'));
const Document = React.lazy(() => import('../parts/document'));
const PdfReader = React.lazy(() => import('../parts/pdfreader'));

const container = document.getElementById('root');
const root = createRoot(container);






const App = () => {
    // const location = useLocation();
    const [panel,setPanel] = useState(null)




    useEffect(()=>{
        //从url中获取panel参数
        const currentURL = window.location.href;
        const searchParams = new URLSearchParams(currentURL.substring(currentURL.indexOf('?')));
        const panelv = searchParams.get('panel');
        console.log("🚀 ~ file: App.jsx:17 ~ useEffect ~ panelv:", panelv)
        setPanel(panelv)


    },[]);


    



    return (
        <div>
            {panel == 'home' && <div><React.Suspense fallback={<div>Loading...</div>}><Home /></React.Suspense></div>}
            {panel =='webscraper' && <div><React.Suspense fallback={<div>Loading...</div>}><WebScraper /></React.Suspense></div>}
            {panel =='document' && <div><React.Suspense fallback={<div>Loading...</div>}><Document /></React.Suspense></div>}
            {panel =='pdfreader' && <div><React.Suspense fallback={<div>Loading...</div>}><PdfReader /></React.Suspense></div>}
            

        </div>


    );
};




root.render(<App />);








