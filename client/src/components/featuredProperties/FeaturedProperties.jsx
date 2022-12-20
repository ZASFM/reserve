import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const {data,loading,error}=useFetch('http://localhost:5000/api/hotels?featured=true');
  return (
    <div className="fp">
       {loading?('Loading, please wait'):(
        <>
           {data.map(item=>{
            return (
              <>
                <div className="fpItem">
                  <img
                    src={item.photo[0]}
                    alt=""
                    className="fpImg"
                  />
                  <span className="fpName">{item.anme}</span>
                  <span className="fpCity">{item.city}</span>
                  <span className="fpPrice">{item.cheapestPrice}</span>
                  {item.rating && <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>}
                </div>
              </>
            )
           })}
        </>
       )}
    </div>
  );
};

export default FeaturedProperties;
