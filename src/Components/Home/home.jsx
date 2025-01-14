import Navbar from "../Navbar/navbar"
import Newclothes from "../Newclothes/newclothes"
import Collection from "../Collection/collection"
import shopData from '../../ShopData'
const Home = () =>{
    return(
        <>
        <Navbar/>
        <Newclothes shopData={shopData}/>
        <Collection/>
        </>
    )
}

export default Home