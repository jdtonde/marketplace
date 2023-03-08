import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs,query,where,orderBy,limit,startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {
   const [listings,setListings] = useState(null)
   const [loading,setLoading]=useState(true)
   const [lastFetchedListing, setLastFetchedListing] = useState(null)

   const params = useParams()
   
   useEffect(()=>{ 
        const fetchListings= async()=>{
                try{
                    // Get reference
                    const listingsRef= collection(db,'listings')

                    //create query
                    const q =query(listingsRef,where('type','==',params.categoryName), orderBy('timestamp','desc'),limit(5))

                    //excute the query
                    const querySnap= await getDocs(q)

                    const lastVisible = querySnap.docs[querySnap.docs.length-1]

                    setLastFetchedListing(lastVisible)


                    const listings=[]

                    querySnap.forEach((doc)=>{
                       return listings.push({
                        id: doc.id ,  // ce id n'esxiste pas dans le .data
                        data:doc.data(), //methode firebase
                       })
                    })

                    setListings(listings)
                    setLoading(false)

                } catch(error){
                     toast.error('Could not fetch listings')
                
                }

        }
        fetchListings()
   },[params.categoryName])


   //pagination /load more 

   const onFetchMoreListing= async()=>{
    try{
        // Get reference
        const listingsRef= collection(db,'listings')

        //create query
        const q =query(listingsRef,where('type','==',params.categoryName), orderBy('timestamp','desc'),startAfter(lastFetchedListing),limit(5))

        //excute the query
        const querySnap= await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length-1]

        setLastFetchedListing(lastVisible)


        const listings=[]

        querySnap.forEach((doc)=>{
           return listings.push({
            id: doc.id ,  // ce id n'esxiste pas dans le .data
            data:doc.data(), //methode firebase
           })
        })

        setListings((x)=>[...x,...listings])
        setLoading(false)

    } catch(error){
         toast.error('Could not fetch listings')
    
    }

}

   return <div className='category'>
    <header>
        <p className='pageHeader'>
            {params.categoryName ==='rent' ? 'Place for rent': 'Place for sale' }
        </p>
    </header>

    {loading ? <Spinner/> : listings && listings.length > 0 ? 
    (<>
    <main>
        <ul className='categoryListings'>
           {listings.map((listing)=>(
        <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
           ))} 
        </ul>
    </main>
    <br /><br />
    {
        lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListing}>Load More</p>
        )
    }

    </> )
    : <p>No listings for {params.categoryName}</p>} 
   </div>
}

export default Category