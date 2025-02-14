import Navbar from "../Navbar/navbar"
import Newclothes from "../Newclothes/newclothes"
import Collection from "../Collection/collection"
import shopData from '../../ShopData'
import ComingSoon from "../ComingSoon/comingsoon"

const Home = () =>{
    return(
        <>
            {/* This part is commented as per instruction */}
            {/* <Navbar/> */}
            {/* <Newclothes shopData={shopData}/> */}
            {/* <Collection/> */}
            <ComingSoon/>
        </>
    )
}

export default Home