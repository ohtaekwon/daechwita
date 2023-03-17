import React from "react";
import * as Styled from "./index.styles";

const BackGround = () => {
  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.SmallPlanet_C
          variant={10}
          src={process.env.PUBLIC_URL + "images/bg_planet_02.png"}
        />
        <Styled.SmallPlanet_C
          variant={30}
          src={process.env.PUBLIC_URL + "images/bg_planet_02.png"}
        />
        <Styled.SmallPlanet_B
          variant={20}
          src={process.env.PUBLIC_URL + "images/bg_planet.png"}
        />
        <Styled.SmallPlanet_B
          variant={60}
          src={process.env.PUBLIC_URL + "images/bg_planet.png"}
        />

        <Styled.SmallPlanet_A
          variant={50}
          src={process.env.PUBLIC_URL + "images/bg_planet_02.png"}
        />

        <Styled.SmallPlanet_B
          variant={52}
          src={process.env.PUBLIC_URL + "images/bg_planet.png"}
        />
        <Styled.SmallPlanet_B
          variant={32}
          src={process.env.PUBLIC_URL + "images/bg_planet.png"}
        />
        <Styled.SmallPlanet_C
          variant={32}
          src={process.env.PUBLIC_URL + "images/bg_planet_02.png"}
        />

        <Styled.MovingImage_A
          variant={30}
          src={process.env.PUBLIC_URL + "images/bg_ufo.png"}
          style={{ zIndex: 3, width: "150px", height: "150px" }}
        />
        <Styled.MovingImage_B
          variant={10}
          src={process.env.PUBLIC_URL + "images/bg_spaceman.png"}
          style={{ zIndex: 3, width: "250px", height: "250px" }}
        />
        <Styled.MovingImage_C
          variant={10}
          src={process.env.PUBLIC_URL + "images/comment.png"}
          style={{ zIndex: 4, width: "250px", height: "150px" }}
        />
        <Styled.Planet
          variant={5}
          src={process.env.PUBLIC_URL + "images/bg_jupyter.png"}
          style={{ left: 0 }}
        />
        <Styled.Planet
          variant={10}
          src={process.env.PUBLIC_URL + "images/bg_sun.png"}
          style={{ left: "40%" }}
        />

        <Styled.Planet
          variant={30}
          src={process.env.PUBLIC_URL + "images/bg_earth.png"}
          style={{ right: 0, transform: `translate(-50%, 50%)` }}
        />
        <Styled.Planet
          variant={14}
          src={process.env.PUBLIC_URL + "images/bg_moon.png"}
          style={{ right: 0, width: "75px", height: "75px" }}
        />
      </Styled.Inner>
    </Styled.Wrapper>
  );
};
export default BackGround;
