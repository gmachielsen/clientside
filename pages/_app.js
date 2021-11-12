import TopNav from "../components/TopNav";
import NavDesktop from "../components/nav/NavDesktop";
import NavMobile from "../components/nav/NavMobile";
import TopNavIndex from "../components/TopNavIndex";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import {useRouter} from 'next/router';
import MediaQuery from 'react-responsive';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const {asPath,route,pathname } = router
  const { slug } = router.query;

  if(asPath === "/"){
    return (
       <Provider>
         <Component {...pageProps} />
       </Provider>
    )
 } else if (
   asPath === "/instructor" ||
   asPath === "/instructor/personal-details" ||
   asPath === "/instructor/course/create" ||
   asPath === "/instructor/revenue" ||
   asPath === `/instructor/course/view/${slug}` ||
   asPath === `/instructor/course/edit/${slug}` ||
   asPath === "/admin" || 
   asPath === "/admin/users" || 
   asPath === "/admin/applicants" || 
   asPath === "/admin/cover" || 
   asPath === "/about" || 
   asPath === "/admin/category" || 
   asPath === "/admin/category/create" ||
   asPath === `/admin/category/edit/${slug}` ||
   asPath === "/admin/subcategory/create" ||
   asPath === `admin/subcategory/edit/${slug}` ||
   asPath === "/user" 
  ) {
    return(
      <Provider>
      <ToastContainer position="top-center" />
      <MediaQuery minWidth={0} maxWidth={1223}>
      <TopNavIndex />

      </MediaQuery>
      <MediaQuery minWidth={1224}>
        <TopNav />
      </MediaQuery>

        <Component {...pageProps} />
      {/* <Footer /> */}
     </Provider>
    )
 } else if (
  asPath === "/courses" 
 ) { return (
  <Provider>
  <ToastContainer position="top-center" />
  <MediaQuery minWidth={0} maxWidth={1223}>
  <NavMobile />

  </MediaQuery>
  <MediaQuery minWidth={1224}>
    <NavDesktop />
  </MediaQuery>

    <Component {...pageProps} />
  {/* <Footer /> */}
 </Provider>
 )

 } else {
   return (
    <Provider>
    <ToastContainer position="top-center" />
    <MediaQuery minWidth={0} maxWidth={1223}>
      <TopNavIndex />

      </MediaQuery>
      <MediaQuery minWidth={1224}>
        <TopNav />
      </MediaQuery>
      <Component {...pageProps} />
    <Footer />
   </Provider>
   )
 }
}

export default MyApp;