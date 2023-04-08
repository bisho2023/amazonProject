import React, { useEffect, useState } from "react";
import axioss from "../../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import changeCards, { changeCounter } from "../../store/action";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';

const Accessories = () => {
  const [accessoriy, setaccessoriy] = useState([]);
  const cards = useSelector((state) => state.card);
  const counter = useSelector((state) => state.count);
  const dispatch = useDispatch();

//   const fetchPost = async () => {
//     await getDocs(collection(db, "accessoriy"))
//         .then((querySnapshot)=>{              
//             const newData = querySnapshot.docs
//                 .map((doc) => ({...doc.data(), id:doc.id }));
//                 setaccessoriy(newData);                
//             console.log(accessoriy, newData);
//         }) 
// }
const productsRef = collection(db, "products");
  const fetchPost = async ()=>{
    const q = query(productsRef, where("category", "==", "accessory"));
    const querySnapshot = await getDocs(q);
     const products = []; 
     querySnapshot.forEach((doc) => { products.push(doc.data()); });
     setaccessoriy(products);
  }


useEffect(()=>{
  fetchPost();

}, [])




  // useEffect(() => {
  //   axioss
  //     .get("accessoriy")
  //     .then((res) => {
  //       console.log(res.data);
  //       setProduct(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);



  return (
    <div className="container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {accessoriy.map((prd,index) => {
          return (
            <div class="col-md-4 my-3" key={index}>
              <div class="card">
                <img
                  className="card-img-top "
                  src={prd.image}
                  alt="Card image cap"
                />
                <div class="card-body">
                  
                  <h5 className="card-title">{prd.name}</h5>
                  <p className="card-text"><strong>Description :</strong>  {prd.description}</p>
                  <h3>Price : {prd.price}</h3>
                  {/* <h3>Rate : {prd.rating.rate}</h3> */}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(changeCards([...cards, prd]));
                      dispatch(changeCounter(counter + 1));
                    }}
                  >
                    Add To Cards
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accessories;