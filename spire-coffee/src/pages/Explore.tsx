import * as React from "react";
import cafeData from "../component/data/cafes.json";
import CafeCard from "@/component/card/CafeCard";


const Explore = () => {
  return (
    <React.Fragment>
      <h1>Hello world, this is the Explore page</h1>
      <div>
        {cafeData.map((cafe) => (
          <CafeCard
            key={cafe.stringId}
            id={parseInt(cafe.stringId)}
            name={cafe.name}
            street={cafe.street}
            city={cafe.city}
            province={cafe.province}
            profilePhotoURL={cafe.profilePhotoURL}
            busyness={cafe.busyness}
            noisiness={cafe.noisiness}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Explore;
